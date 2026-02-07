import {
  retry,
  circuitBreaker,
  wrap,
  handleAll,
  ExponentialBackoff,
  ConsecutiveBreaker,
} from 'cockatiel'

export const MAX_RETRY_ATTEMPTS = 3
export const HALF_OPEN_AFTER_MS = 30_000

export const retryPolicy = retry(handleAll, {
  maxAttempts: MAX_RETRY_ATTEMPTS,
  backoff: new ExponentialBackoff(),
})

export const breakerPolicy = circuitBreaker(handleAll, {
  halfOpenAfter: HALF_OPEN_AFTER_MS,
  breaker: new ConsecutiveBreaker(MAX_RETRY_ATTEMPTS),
})

export const resilientPolicy = wrap(retryPolicy, breakerPolicy)

export const EXCHANGE_API_FAILURE_RATE = 0.3
export const EXCHANGE_API_MIN_LATENCY_MS = 800
export const EXCHANGE_API_MAX_LATENCY_MS = 2000
