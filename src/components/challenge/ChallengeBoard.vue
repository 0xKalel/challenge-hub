<script setup lang="ts">
import type { Day } from '@/types/challenge'
import type { ExchangeStatus } from '@/types/exchange'
import DayCard from './DayCard.vue'

const props = defineProps<{
  days: Day[]
  expandedDays: Set<number>
  exchangeStatus: ExchangeStatus
}>()

defineEmits<{
  toggleExpand: [dayIndex: number]
  toggleTask: [taskId: string]
  connectExchange: []
}>()

function hasExchangeTask(day: Day): boolean {
  return day.tasks.some((t) => t.type === 'exchange')
}
</script>

<template>
  <div class="space-y-3">
    <DayCard
      v-for="day in days"
      :key="day.index"
      :day="day"
      :is-expanded="props.expandedDays.has(day.index)"
      :exchange-status="hasExchangeTask(day) ? exchangeStatus : undefined"
      @toggle-expand="$emit('toggleExpand', $event)"
      @toggle-task="$emit('toggleTask', $event)"
      @connect-exchange="$emit('connectExchange')"
    />
  </div>
</template>
