import { logEvent } from '@/services/tracking/eventLogger'
import type { TrackingEventName } from '@/types/tracking'

interface UseEventTrackingReturn {
  readonly track: (name: TrackingEventName, payload?: Record<string, unknown>) => void
}

export function useEventTracking(): UseEventTrackingReturn {
  function track(name: TrackingEventName, payload?: Record<string, unknown>): void {
    logEvent(name, payload)
  }

  return { track }
}
