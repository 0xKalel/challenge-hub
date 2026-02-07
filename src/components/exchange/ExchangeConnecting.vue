<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

defineProps<{
  attempt: number
}>()
</script>

<template>
  <div class="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-3">
    <Loader2 class="h-4 w-4 animate-spin text-primary" />
    <span class="flex-1 text-sm">
      Connecting to exchange<span v-if="attempt > 1"> (attempt {{ attempt }})...</span><span v-else>...</span>
    </span>
  </div>
</template>
