export type TrackingEventName =
  | 'challenge_dashboard_viewed'
  | 'day_opened'
  | 'task_toggled'
  | 'day_completed'
  | 'challenge_completed'
  | 'exchange_connection_attempted'
  | 'exchange_connection_succeeded'
  | 'exchange_connection_failed'

export interface TrackingEvent {
  readonly name: TrackingEventName
  readonly timestamp: number
  readonly payload?: Record<string, unknown>
}
