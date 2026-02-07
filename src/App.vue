<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
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
  resetProgress,
} = useChallengeProgress()

const {
  status: exchangeStatus,
  attemptConnection,
  dispose: disposeExchange,
} = useExchangeConnection(
  () => {
    if (exchangeTaskId.value) {
      handleCompleteTask(exchangeTaskId.value)
    }
  },
  (name, payload) => track(name as Parameters<typeof track>[0], payload),
)

const initialDay = days.value[progress.value.currentDayIndex ?? -1]
const expandedDayIndex = ref<number | null>(
  initialDay?.status === 'in-progress' ? initialDay.index : null,
)

// Days the user has explicitly navigated to via the CTA
const activatedDays = ref(new Set(
  days.value.filter((d) => d.status === 'in-progress').map((d) => d.index),
))

const visibleDays = computed(() =>
  days.value.filter((d) =>
    d.status === 'completed' ||
    d.status === 'in-progress' ||
    activatedDays.value.has(d.index),
  ),
)

function onToggleExpand(dayIndex: number): void {
  expandedDayIndex.value = expandedDayIndex.value === dayIndex ? null : dayIndex
  track('day_opened', { dayId: dayIndex })
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

function onNavigate(dayIndex: number): void {
  activatedDays.value = new Set([...activatedDays.value, dayIndex])
  expandedDayIndex.value = dayIndex
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
      <AppHeader @reset="resetProgress" />
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
          v-if="progress.currentDayIndex !== null && !progress.isAllComplete"
          :key="progress.currentDayIndex"
          :current-day-number="progress.currentDayIndex + 1"
          :current-day-title="days[progress.currentDayIndex]?.title ?? ''"
          :is-current-day-expanded="expandedDayIndex === progress.currentDayIndex"
          @navigate="onNavigate"
        />
      </Transition>
    </template>

    <template #board>
      <ChallengeBoard
        :days="visibleDays"
        :expanded-day-index="expandedDayIndex"
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
