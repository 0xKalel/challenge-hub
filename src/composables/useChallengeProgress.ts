import { ref, computed, watch } from 'vue'
import type { ChallengeState, ChallengeProgress, Day } from '@/types/challenge'
import { createInitialDays } from '@/constants/challengeData'
import {
  toggleTask as engineToggleTask,
  completeTask as engineCompleteTask,
  computeProgress,
  findExchangeTask,
} from '@/services/challenge/challengeEngine'
import { saveState, loadState, clearState } from '@/services/persistence/localStorageService'

export function useChallengeProgress() {
  const savedState = loadState()
  const state = ref<ChallengeState>(savedState ?? {
    days: createInitialDays(),
    startedAt: Date.now(),
  })

  const days = computed<Day[]>(() => state.value.days)
  const progress = computed<ChallengeProgress>(() => computeProgress(state.value))
  const exchangeTaskId = computed<string | undefined>(() => findExchangeTask(state.value)?.id)

  watch(state, (newState) => saveState(newState), { deep: true })

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
