<script setup lang="ts">
import { CheckCircle } from 'lucide-vue-next'
</script>

<template>
  <div class="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-3 py-3 dark:border-green-800 dark:bg-green-950/30">
    <CheckCircle class="h-4 w-4 text-green-600 dark:text-green-400" />
    <span class="flex-1 text-sm font-medium text-green-700 dark:text-green-300">Exchange connected</span>
  </div>
</template>
