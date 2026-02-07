<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'

defineProps<{
  id: string
  label: string
  completed: boolean
  disabled: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()
</script>

<template>
  <div
    class="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted/50"
    :class="{ 'opacity-50 pointer-events-none': disabled }"
  >
    <Checkbox
      :id="id"
      :model-value="completed"
      :disabled="disabled"
      @update:model-value="emit('toggle')"
    />
    <span
      class="text-sm select-none"
      :class="{ 'line-through text-muted-foreground': completed }"
      @click="emit('toggle')"
    >
      {{ label }}
    </span>
  </div>
</template>
