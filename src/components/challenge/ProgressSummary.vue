<script setup lang="ts">
import { Progress } from '@/components/ui/progress'

defineProps<{
  completedDays: number
  totalDays: number
  percentage: number
}>()
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between text-sm">
      <span class="font-medium">Challenge Progress</span>
      <span class="text-muted-foreground">{{ completedDays }} / {{ totalDays }} days complete</span>
    </div>
    <Progress :model-value="percentage" class="h-3" :aria-label="`Challenge progress: ${completedDays} of ${totalDays} days complete`" />
  </div>
</template>
