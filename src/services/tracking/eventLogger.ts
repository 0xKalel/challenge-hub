import type { TrackingEvent, TrackingEventName } from '@/types/tracking'

export function logEvent(name: TrackingEventName, payload?: Record<string, unknown>): TrackingEvent {
  const event: TrackingEvent = {
    name,
    timestamp: Date.now(),
    payload,
  }

  console.log(
    `%c[ChallengeHub] %c${event.name}`,
    'color: #8b5cf6; font-weight: bold;',
    'color: #10b981; font-weight: bold;',
    event.payload ?? '',
  )

  return event
}
