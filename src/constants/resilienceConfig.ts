import {
  retry,
  circuitBreaker,
  wrap,
  handleAll,
  ExponentialBackoff,
  ConsecutiveBreaker,
  type RetryPolicy,
  type CircuitBreakerPolicy,
  type IPolicy,
} from 'cockatiel'

export const MAX_RETRY_ATTEMPTS = 3
export const HALF_OPEN_AFTER_MS = 30_000

export interface ResilientPolicies {
  readonly retryPolicy: RetryPolicy
  readonly breakerPolicy: CircuitBreakerPolicy
  readonly resilientPolicy: IPolicy
}

export function createResilientPolicies(): ResilientPolicies {
  const retryPolicy = retry(handleAll, {
    maxAttempts: MAX_RETRY_ATTEMPTS,
    backoff: new ExponentialBackoff(),
  })

  const breakerPolicy = circuitBreaker(handleAll, {
    halfOpenAfter: HALF_OPEN_AFTER_MS,
    breaker: new ConsecutiveBreaker(MAX_RETRY_ATTEMPTS),
  })

  const resilientPolicy = wrap(retryPolicy, breakerPolicy)

  return { retryPolicy, breakerPolicy, resilientPolicy }
}

export const EXCHANGE_API_FAILURE_RATE = 0.3
export const EXCHANGE_API_MIN_LATENCY_MS = 800
export const EXCHANGE_API_MAX_LATENCY_MS = 2000
