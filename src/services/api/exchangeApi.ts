import type { ExchangeApiResult } from '@/types/exchange'
import {
  EXCHANGE_API_FAILURE_RATE,
  EXCHANGE_API_MIN_LATENCY_MS,
  EXCHANGE_API_MAX_LATENCY_MS,
} from '@/constants/resilienceConfig'

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function connectExchange(): Promise<ExchangeApiResult> {
  const latency = randomBetween(EXCHANGE_API_MIN_LATENCY_MS, EXCHANGE_API_MAX_LATENCY_MS)

  return new Promise<ExchangeApiResult>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < EXCHANGE_API_FAILURE_RATE) {
        const errors = [
          'Exchange connection timed out',
          'Exchange server unavailable (503)',
          'Network error: unable to reach exchange',
        ]
        reject(new Error(errors[Math.floor(Math.random() * errors.length)]))
      } else {
        resolve({
          connected: true,
          exchangeId: `exc_${Date.now().toString(36)}`,
        })
      }
    }, latency)
  })
}
