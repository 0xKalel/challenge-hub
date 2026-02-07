<script setup lang="ts">
import { Trophy } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

defineEmits<{
  reset: []
}>()
</script>

<template>
  <header class="border-b border-border bg-card px-6 py-4">
    <div class="mx-auto flex max-w-3xl items-center gap-3">
      <Trophy class="h-6 w-6 text-primary" />
      <h1 class="text-xl font-bold tracking-tight">ChallengeHub</h1>
      <span class="text-sm text-muted-foreground">5-Day Trading Challenge</span>
      <div class="ml-auto">
        <Button variant="ghost" size="sm" @click="$emit('reset')">Reset</Button>
      </div>
    </div>
  </header>
</template>
