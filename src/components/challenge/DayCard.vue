<script setup lang="ts">
import { computed } from 'vue'
import type { Day } from '@/types/challenge'
import type { ExchangeStatus } from '@/types/exchange'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Lock, ChevronDown, Check } from 'lucide-vue-next'
import TaskItem from './TaskItem.vue'
import ExchangeTask from '@/components/exchange/ExchangeTask.vue'

const props = defineProps<{
  day: Day
  isExpanded: boolean
  exchangeStatus?: ExchangeStatus
}>()

defineEmits<{
  toggleExpand: [dayIndex: number]
  toggleTask: [taskId: string]
  connectExchange: []
}>()

const isLocked = computed(() => props.day.status === 'locked')
const isCompleted = computed(() => props.day.status === 'completed')
const completedCount = computed(() => props.day.tasks.filter((t) => t.completed).length)

const badgeVariant = computed(() => {
  switch (props.day.status) {
    case 'completed': return 'default' as const
    case 'in-progress': return 'secondary' as const
    case 'unlocked': return 'outline' as const
    case 'locked': return 'outline' as const
  }
})

const statusLabel = computed(() => {
  switch (props.day.status) {
    case 'completed': return 'Completed'
    case 'in-progress': return 'In Progress'
    case 'unlocked': return 'Unlocked'
    case 'locked': return 'Locked'
  }
})
</script>

<template>
  <Card :class="{ 'opacity-60': isLocked }">
    <Collapsible :open="isExpanded && !isLocked" @update:open="$emit('toggleExpand', day.index)">
      <CollapsibleTrigger as-child :tabindex="isLocked ? -1 : undefined">
        <CardHeader class="cursor-pointer select-none" :class="{ 'cursor-not-allowed': isLocked }" :aria-disabled="isLocked || undefined">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300"
                :class="isCompleted ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-muted text-muted-foreground'"
              >
                <Check v-if="isCompleted" class="h-4 w-4" />
                <Lock v-else-if="isLocked" class="h-3.5 w-3.5" />
                <span v-else>{{ day.index + 1 }}</span>
              </div>
              <div>
                <CardTitle class="text-base">Day {{ day.index + 1 }}: {{ day.title }}</CardTitle>
                <p class="text-xs text-muted-foreground">
                  {{ completedCount }}/{{ day.tasks.length }} tasks
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <Badge :variant="badgeVariant">{{ statusLabel }}</Badge>
              <ChevronDown
                v-if="!isLocked"
                class="h-4 w-4 text-muted-foreground transition-transform"
                :class="{ 'rotate-180': isExpanded }"
              />
            </div>
          </div>
        </CardHeader>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <CardContent class="space-y-1 pt-0">
          <template v-for="task in day.tasks" :key="task.id">
            <ExchangeTask
              v-if="task.type === 'exchange'"
              :status="task.completed ? { state: 'success', exchangeId: 'restored' } : (exchangeStatus ?? { state: 'idle' })"
              @connect="$emit('connectExchange')"
            />
            <TaskItem
              v-else
              :id="task.id"
              :label="task.label"
              :completed="task.completed"
              :disabled="isLocked || isCompleted"
              @toggle="$emit('toggleTask', task.id)"
            />
          </template>
        </CardContent>
      </CollapsibleContent>
    </Collapsible>
  </Card>
</template>
