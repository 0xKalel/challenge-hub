export type DayStatus = 'locked' | 'unlocked' | 'in-progress' | 'completed'

export type TaskType = 'standard' | 'exchange'

export interface Task {
  readonly id: string
  readonly dayIndex: number
  readonly label: string
  readonly type: TaskType
  completed: boolean
}

export interface Day {
  readonly index: number
  readonly title: string
  readonly tasks: Task[]
  status: DayStatus
}

export interface ChallengeState {
  readonly days: Day[]
  readonly startedAt: number
}

export interface ChallengeProgress {
  readonly completedDays: number
  readonly totalDays: number
  readonly percentage: number
  readonly currentDayIndex: number | null
  readonly isAllComplete: boolean
}
