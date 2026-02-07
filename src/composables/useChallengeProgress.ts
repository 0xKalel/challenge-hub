import { ref, computed } from 'vue'
import type { ChallengeState, ChallengeProgress, Day } from '@/types/challenge'
import { createInitialDays } from '@/constants/challengeData'
import {
  toggleTask as engineToggleTask,
  completeTask as engineCompleteTask,
  computeProgress,
  findExchangeTask,
} from '@/services/challenge/challengeEngine'

export function useChallengeProgress() {
  const state = ref<ChallengeState>({
    days: createInitialDays(),
    startedAt: Date.now(),
  })

  const days = computed<Day[]>(() => state.value.days)
  const progress = computed<ChallengeProgress>(() => computeProgress(state.value))
  const exchangeTaskId = computed<string | undefined>(() => findExchangeTask(state.value)?.id)

  function handleToggleTask(taskId: string): void {
    state.value = engineToggleTask(state.value, taskId)
  }

  function handleCompleteTask(taskId: string): void {
    state.value = engineCompleteTask(state.value, taskId)
  }

  return { state, days, progress, exchangeTaskId, handleToggleTask, handleCompleteTask }
}
