<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-vue-next'

defineProps<{
  currentDayNumber: number
  currentDayTitle: string
}>()

defineEmits<{
  navigate: [dayIndex: number]
}>()
</script>

<template>
  <Alert class="border-primary/20 bg-primary/5">
    <AlertTitle class="flex items-center justify-between">
      <span>Next Up: Day {{ currentDayNumber }}</span>
      <Button size="sm" @click="$emit('navigate', currentDayNumber - 1)">
        Continue
        <ArrowRight class="ml-1 h-4 w-4" />
      </Button>
    </AlertTitle>
    <AlertDescription>{{ currentDayTitle }}</AlertDescription>
  </Alert>
</template>
