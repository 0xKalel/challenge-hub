import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { watchDebounced } from '@vueuse/core'
import type { ChallengeState, ChallengeProgress, Day } from '@/types/challenge'
import { createInitialDays } from '@/constants/challengeData'
import {
  toggleTask as engineToggleTask,
  completeTask as engineCompleteTask,
  computeProgress,
  findExchangeTask,
} from '@/services/challenge/challengeEngine'
import { saveState, loadState, clearState } from '@/services/persistence/localStorageService'

// Module-scoped state — singleton shared across all callers
const savedState = loadState()
const state = ref<ChallengeState>(savedState ?? {
  days: createInitialDays(),
  startedAt: Date.now(),
})

watchDebounced(state, (newState) => saveState(newState), { deep: true, debounce: 300 })

interface UseChallengeProgressReturn {
  readonly state: Ref<ChallengeState>
  readonly days: ComputedRef<Day[]>
  readonly progress: ComputedRef<ChallengeProgress>
  readonly exchangeTaskId: ComputedRef<string | undefined>
  readonly handleToggleTask: (taskId: string) => void
  readonly handleCompleteTask: (taskId: string) => void
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

  function resetProgress(): void {
    clearState()
    state.value = { days: createInitialDays(), startedAt: Date.now() }
  }

  return { state, days, progress, exchangeTaskId, handleToggleTask, handleCompleteTask, resetProgress }
}
