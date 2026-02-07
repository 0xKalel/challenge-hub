import type { Day, DayStatus, ChallengeState, ChallengeProgress, Task } from '@/types/challenge'

export function isDayComplete(day: Day): boolean {
  return day.tasks.every((t) => t.completed)
}

export function computeDayStatus(day: Day, previousDayComplete: boolean): DayStatus {
  if (day.index === 0) {
    return isDayComplete(day) ? 'completed' : 'in-progress'
  }
  if (!previousDayComplete) return 'locked'
  if (isDayComplete(day)) return 'completed'
  if (day.tasks.some((t) => t.completed)) return 'in-progress'
  return 'unlocked'
}

export function recomputeAllStatuses(days: Day[]): Day[] {
  return days.map((day, i) => {
    const prevDay = days[i - 1]
    const prevComplete = i === 0 ? true : (prevDay ? isDayComplete(prevDay) : false)
    return { ...day, status: computeDayStatus(day, prevComplete) }
  })
}

export function toggleTask(state: ChallengeState, taskId: string): ChallengeState {
  const newDays = state.days.map((day) => ({
    ...day,
    tasks: day.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : { ...task },
    ),
  }))
  return { ...state, days: recomputeAllStatuses(newDays) }
}

export function completeTask(state: ChallengeState, taskId: string): ChallengeState {
  const newDays = state.days.map((day) => ({
    ...day,
    tasks: day.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : { ...task },
    ),
  }))
  return { ...state, days: recomputeAllStatuses(newDays) }
}

export function computeProgress(state: ChallengeState): ChallengeProgress {
  const completedDays = state.days.filter((d) => d.status === 'completed').length
  const totalDays = state.days.length
  const currentDayIndex = state.days.findIndex(
    (d) => d.status === 'unlocked' || d.status === 'in-progress',
  )

  return {
    completedDays,
    totalDays,
    percentage: Math.round((completedDays / totalDays) * 100),
    currentDayIndex: currentDayIndex === -1 ? null : currentDayIndex,
    isAllComplete: completedDays === totalDays,
  }
}

export function findExchangeTask(state: ChallengeState): Task | undefined {
  for (const day of state.days) {
    const found = day.tasks.find((t) => t.type === 'exchange')
    if (found) return found
  }
  return undefined
}
