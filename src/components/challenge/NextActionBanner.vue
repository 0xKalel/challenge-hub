<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-vue-next'

defineProps<{
  nextDayNumber: number
  nextDayTitle: string
  isReady: boolean
}>()

defineEmits<{
  navigate: [dayIndex: number]
}>()
</script>

<template>
  <Alert class="border-primary/20 bg-primary/5">
    <AlertTitle class="flex items-center justify-between">
      <span>Next Up: Day {{ nextDayNumber }}</span>
      <Button variant="outline" size="sm" :disabled="!isReady" @click="$emit('navigate', nextDayNumber - 1)">
        Go to Day {{ nextDayNumber }}
        <ArrowRight class="ml-1 h-4 w-4" />
      </Button>
    </AlertTitle>
    <AlertDescription>{{ nextDayTitle }}</AlertDescription>
  </Alert>
</template>
