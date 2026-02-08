<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useChallengeProgress } from '@/composables/useChallengeProgress'
import { useExchangeConnection } from '@/composables/useExchangeConnection'
import { useEventTracking } from '@/composables/useEventTracking'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import ProgressSummary from '@/components/challenge/ProgressSummary.vue'
import NextActionBanner from '@/components/challenge/NextActionBanner.vue'
import ChallengeBoard from '@/components/challenge/ChallengeBoard.vue'
import CompletionBanner from '@/components/challenge/CompletionBanner.vue'

const { track } = useEventTracking()

const {
  days,
  progress,
  exchangeTaskId,
  handleToggleTask,
  handleCompleteTask,
  handleUnlockDay,
  resetProgress,
} = useChallengeProgress()

const {
  status: exchangeStatus,
  attemptConnection,
  reset: resetExchange,
  dispose: disposeExchange,
} = useExchangeConnection(
  () => {
    if (exchangeTaskId.value) {
      handleCompleteTask(exchangeTaskId.value)
    }
  },
  (name, payload) => track(name as Parameters<typeof track>[0], payload),
)

const expandedDays = ref(new Set(
  days.value.filter((d) => d.status === 'in-progress').map((d) => d.index),
))

function onToggleExpand(dayIndex: number): void {
  const next = new Set(expandedDays.value)
  if (next.has(dayIndex)) {
    next.delete(dayIndex)
  } else {
    next.add(dayIndex)
    track('day_opened', { dayId: dayIndex })
  }
  expandedDays.value = next
}

function onToggleTask(taskId: string): void {
  const dayBefore = days.value.map((d) => d.status)
  handleToggleTask(taskId)
  const task = days.value.flatMap((d) => d.tasks).find((t) => t.id === taskId)
  if (task) {
    track('task_toggled', { dayId: task.dayIndex, taskId, completed: task.completed })
  }
  days.value.forEach((day, i) => {
    if (day.status === 'completed' && dayBefore[i] !== 'completed') {
      track('day_completed', { dayId: day.index })
    }
  })
}

function handleReset(): void {
  resetProgress()
  resetExchange()
}

function onNavigate(dayIndex: number): void {
  handleUnlockDay(dayIndex)
  const next = new Set(expandedDays.value)
  next.add(dayIndex)
  expandedDays.value = next
  track('day_opened', { dayId: dayIndex })
}

watch(
  () => progress.value.isAllComplete,
  (complete) => {
    if (complete) track('challenge_completed')
  },
)

onMounted(() => {
  track('challenge_dashboard_viewed')
})

onUnmounted(() => {
  disposeExchange()
})
</script>

<template>
  <DashboardLayout>
    <template #header>
      <AppHeader @reset="handleReset" />
    </template>

    <template #summary>
      <ProgressSummary
        :completed-days="progress.completedDays"
        :total-days="progress.totalDays"
        :percentage="progress.percentage"
      />
    </template>

    <template #banner>
      <Transition name="fade-slide" mode="out-in">
        <NextActionBanner
          v-if="progress.nextDayIndex !== null && !progress.isAllComplete"
          :key="progress.nextDayIndex"
          :next-day-number="progress.nextDayIndex + 1"
          :next-day-title="days[progress.nextDayIndex]?.title ?? ''"
          :is-ready="progress.isNextDayReady"
          @navigate="onNavigate"
        />
      </Transition>
    </template>

    <template #board>
      <ChallengeBoard
        :days="days"
        :expanded-days="expandedDays"
        :exchange-status="exchangeStatus"
        @toggle-expand="onToggleExpand"
        @toggle-task="onToggleTask"
        @connect-exchange="attemptConnection"
      />
    </template>

    <template #completion>
      <CompletionBanner :visible="progress.isAllComplete" />
    </template>
  </DashboardLayout>
</template>
