import {
  retry,
  circuitBreaker,
  wrap,
  handleAll,
  ExponentialBackoff,
  ConsecutiveBreaker,
} from 'cockatiel'

export const retryPolicy = retry(handleAll, {
  maxAttempts: 3,
  backoff: new ExponentialBackoff(),
})

export const breakerPolicy = circuitBreaker(handleAll, {
  halfOpenAfter: 30_000,
  breaker: new ConsecutiveBreaker(3),
})

export const resilientPolicy = wrap(retryPolicy, breakerPolicy)

export const EXCHANGE_API_FAILURE_RATE = 0.3
export const EXCHANGE_API_MIN_LATENCY_MS = 800
export const EXCHANGE_API_MAX_LATENCY_MS = 2000
