import { ref, readonly, type DeepReadonly, type Ref } from 'vue'
import type { ExchangeStatus } from '@/types/exchange'
import { connectExchange } from '@/services/api/exchangeApi'
import { resilientPolicy, retryPolicy, breakerPolicy, MAX_RETRY_ATTEMPTS, HALF_OPEN_AFTER_MS } from '@/constants/resilienceConfig'
import { BrokenCircuitError } from 'cockatiel'

type EventCallback = (name: string, payload?: Record<string, unknown>) => void

interface UseExchangeConnectionReturn {
  readonly status: DeepReadonly<Ref<ExchangeStatus>>
  readonly attemptConnection: () => Promise<void>
  readonly dispose: () => void
}

export function useExchangeConnection(
  onSuccess: () => void,
  onEvent: EventCallback,
): UseExchangeConnectionReturn {
  const status = ref<ExchangeStatus>({ state: 'idle' })
  let disposed = false

  // Wire cockatiel events to tracking
  const retryDisposable = retryPolicy.onRetry(({ attempt }) => {
    if (!disposed) {
      status.value = { state: 'connecting', attempt }
    }
  })

  const breakDisposable = breakerPolicy.onBreak(() => {
    onEvent('exchange_connection_failed', { errorType: 'circuit_open', willRetry: false })
  })

  async function attemptConnection(): Promise<void> {
    const startTime = Date.now()
    status.value = { state: 'connecting', attempt: 1 }
    onEvent('exchange_connection_attempted', { timestamp: startTime })

    try {
      const result = await resilientPolicy.execute(() => connectExchange())
      const responseTime = Date.now() - startTime
      status.value = { state: 'success', exchangeId: result.exchangeId ?? 'unknown' }
      onEvent('exchange_connection_succeeded', { timestamp: Date.now(), responseTime })
      onSuccess()
    } catch (err) {
      if (err instanceof BrokenCircuitError) {
        status.value = { state: 'circuit-open', reopensAt: Date.now() + HALF_OPEN_AFTER_MS }
      } else {
        const message = err instanceof Error ? err.message : 'Unknown error'
        status.value = { state: 'error', message, attempt: MAX_RETRY_ATTEMPTS }
        onEvent('exchange_connection_failed', {
          timestamp: Date.now(),
          errorType: message,
          willRetry: false,
        })
      }
    }
  }

  function dispose(): void {
    disposed = true
    retryDisposable.dispose()
    breakDisposable.dispose()
  }

  return { status: readonly(status), attemptConnection, dispose }
}
