<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Link, Loader2 } from 'lucide-vue-next'

const emit = defineEmits<{
  connect: []
}>()

const pending = ref(false)

function handleConnect(): void {
  pending.value = true
  emit('connect')
}
</script>

<template>
  <div class="flex items-center gap-3 rounded-lg border border-dashed border-border px-3 py-3">
    <Link class="h-4 w-4 text-muted-foreground" />
    <span class="flex-1 text-sm">Connect your exchange account</span>
    <Button size="sm" :disabled="pending" @click="handleConnect">
      <Loader2 v-if="pending" class="h-4 w-4 animate-spin" />
      <span>{{ pending ? 'Connecting...' : 'Connect Exchange' }}</span>
    </Button>
  </div>
</template>
