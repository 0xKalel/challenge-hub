<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { PartyPopper } from 'lucide-vue-next'

defineProps<{
  visible: boolean
}>()
</script>

<template>
  <Transition name="scale-fade">
    <Alert v-if="visible" class="border-green-500/30 bg-green-50 dark:bg-green-950/20">
      <PartyPopper class="h-5 w-5 text-green-600" />
      <AlertTitle class="text-green-800 dark:text-green-200">Challenge Complete!</AlertTitle>
      <AlertDescription class="text-green-700 dark:text-green-300">
        Congratulations! You've completed all 5 days of the trading challenge. Your dedication to learning is impressive.
      </AlertDescription>
    </Alert>
  </Transition>
</template>
