<script setup lang="ts">
import { watch } from 'vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ShieldAlert } from 'lucide-vue-next'
import { useCountdown } from '@/composables/useCountdown'

const props = defineProps<{
  reopensAt: number
}>()

defineEmits<{
  retry: []
}>()

const { remainingMs, start } = useCountdown()

watch(() => props.reopensAt, (val) => start(val), { immediate: true })

function formatSeconds(ms: number): string {
  return `${Math.ceil(ms / 1000)}s`
}
</script>

<template>
  <Alert class="border-amber-300 bg-amber-50 py-3 dark:border-amber-700 dark:bg-amber-950/20">
    <ShieldAlert class="h-4 w-4 text-amber-600" />
    <AlertTitle class="flex items-center justify-between text-amber-800 dark:text-amber-200">
      <span>Too Many Failures</span>
      <Button
        v-if="remainingMs <= 0"
        variant="outline"
        size="sm"
        @click="$emit('retry')"
      >
        Retry Now
      </Button>
    </AlertTitle>
    <AlertDescription class="text-xs text-amber-700 dark:text-amber-300">
      <template v-if="remainingMs > 0">
        Exchange is temporarily unavailable. Retries paused — available again in {{ formatSeconds(remainingMs) }}.
      </template>
      <template v-else>
        Circuit breaker reset. You can retry now.
      </template>
    </AlertDescription>
  </Alert>
</template>
