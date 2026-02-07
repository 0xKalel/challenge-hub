import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { watchDebounced } from '@vueuse/core'
import type { ChallengeState, ChallengeProgress, Day } from '@/types/challenge'
import { createInitialDays } from '@/constants/challengeData'
import {
  recomputeAllStatuses,
  toggleTask as engineToggleTask,
  completeTask as engineCompleteTask,
  unlockDay as engineUnlockDay,
  computeProgress,
  findExchangeTask,
} from '@/services/challenge/challengeEngine'
import { saveState, loadState, clearState } from '@/services/persistence/localStorageService'

// Module-scoped state — singleton shared across all callers
const savedState = loadState()
const initialState: ChallengeState = savedState ?? {
  days: createInitialDays(),
  startedAt: Date.now(),
}
// Recompute on load to normalise stale localStorage data
const state = ref<ChallengeState>({
  ...initialState,
  days: recomputeAllStatuses(initialState.days),
})

watchDebounced(state, (newState) => saveState(newState), { deep: true, debounce: 300 })

interface UseChallengeProgressReturn {
  readonly state: Ref<ChallengeState>
  readonly days: ComputedRef<Day[]>
  readonly progress: ComputedRef<ChallengeProgress>
  readonly exchangeTaskId: ComputedRef<string | undefined>
  readonly handleToggleTask: (taskId: string) => void
  readonly handleCompleteTask: (taskId: string) => void
  readonly handleUnlockDay: (dayIndex: number) => void
  readonly resetProgress: () => void
}

export function useChallengeProgress(): UseChallengeProgressReturn {
  const days = computed<Day[]>(() => state.value.days)
  const progress = computed<ChallengeProgress>(() => computeProgress(state.value))
  const exchangeTaskId = computed<string | undefined>(() => findExchangeTask(state.value)?.id)

  function handleToggleTask(taskId: string): void {
    state.value = engineToggleTask(state.value, taskId)
  }

  function handleCompleteTask(taskId: string): void {
    state.value = engineCompleteTask(state.value, taskId)
  }

  function handleUnlockDay(dayIndex: number): void {
    state.value = engineUnlockDay(state.value, dayIndex)
  }

  function resetProgress(): void {
    clearState()
    state.value = { days: createInitialDays(), startedAt: Date.now() }
  }

  return { state, days, progress, exchangeTaskId, handleToggleTask, handleCompleteTask, handleUnlockDay, resetProgress }
}
