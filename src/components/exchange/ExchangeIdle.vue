<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Link } from 'lucide-vue-next'

defineEmits<{
  connect: []
}>()
</script>

<template>
  <div class="flex items-center gap-3 rounded-lg border border-dashed border-border px-3 py-3">
    <Link class="h-4 w-4 text-muted-foreground" />
    <span class="flex-1 text-sm">Connect your exchange account</span>
    <Button size="sm" @click="$emit('connect')">Connect Exchange</Button>
  </div>
</template>
