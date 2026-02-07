import { logEvent } from '@/services/tracking/eventLogger'
import type { TrackingEventName } from '@/types/tracking'

export function useEventTracking() {
  function track(name: TrackingEventName, payload?: Record<string, unknown>): void {
    logEvent(name, payload)
  }

  return { track }
}
