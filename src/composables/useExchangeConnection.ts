import { ref, readonly } from 'vue'
import type { ExchangeStatus } from '@/types/exchange'
import { connectExchange } from '@/services/api/exchangeApi'
import { resilientPolicy, retryPolicy, breakerPolicy } from '@/constants/resilienceConfig'
import { BrokenCircuitError } from 'cockatiel'

type EventCallback = (name: string, payload?: Record<string, unknown>) => void

export function useExchangeConnection(
  onSuccess: () => void,
  onEvent: EventCallback,
) {
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
        status.value = { state: 'circuit-open', reopensAt: Date.now() + 30_000 }
      } else {
        const message = err instanceof Error ? err.message : 'Unknown error'
        status.value = { state: 'error', message, attempt: 3 }
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
