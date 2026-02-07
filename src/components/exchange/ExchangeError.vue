<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-vue-next'

defineProps<{
  message: string
  attempt: number
}>()

defineEmits<{
  retry: []
}>()
</script>

<template>
  <Alert variant="destructive" class="py-3">
    <AlertTriangle class="h-4 w-4" />
    <AlertTitle class="flex items-center justify-between">
      <span>Connection Failed</span>
      <Button variant="outline" size="sm" @click="$emit('retry')">Retry</Button>
    </AlertTitle>
    <AlertDescription class="text-xs">
      {{ message }} (attempt {{ attempt }}/3)
    </AlertDescription>
  </Alert>
</template>
