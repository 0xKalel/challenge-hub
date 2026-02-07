<script setup lang="ts">
import { ref } from 'vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Loader2 } from 'lucide-vue-next'

defineProps<{
  message: string
  attempt: number
}>()

const emit = defineEmits<{
  retry: []
}>()

const pending = ref(false)

function handleRetry(): void {
  pending.value = true
  emit('retry')
}
</script>

<template>
  <Alert variant="destructive" class="py-3">
    <AlertTriangle class="h-4 w-4" />
    <AlertTitle class="flex items-center justify-between">
      <span>Connection Failed</span>
      <Button variant="outline" size="sm" :disabled="pending" @click="handleRetry">
        <Loader2 v-if="pending" class="h-4 w-4 animate-spin" />
        <span>{{ pending ? 'Retrying...' : 'Retry' }}</span>
      </Button>
    </AlertTitle>
    <AlertDescription class="text-xs">
      {{ message }} (attempt {{ attempt }}/3)
    </AlertDescription>
  </Alert>
</template>
