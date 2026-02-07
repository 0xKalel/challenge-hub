---
name: component
description: Generate a new Vue SFC component following ChallengeHub project patterns
argument-hint: <ComponentName> <domain: challenge|exchange|layout>
disable-model-invocation: true
---

Create a new Vue component named `$0` in the `$1` domain.

## File Location
Create the file at: `src/components/$1/$0.vue`

## Required Pattern
Every component MUST follow this exact structure:

```vue
<script setup lang="ts">
import { computed } from 'vue'
// 1. Type imports (always use `import type`)
import type { SomeType } from '@/types/domain'
// 2. shadcn-vue component imports
import { Card, CardContent } from '@/components/ui/card'
// 3. lucide icon imports
import { IconName } from 'lucide-vue-next'
// 4. Child component imports
import ChildComponent from './ChildComponent.vue'

// Props — always use generic defineProps, never runtime declarations
const props = defineProps<{
  propName: PropType
}>()

// Emits — always use typed defineEmits
defineEmits<{
  eventName: [payload: PayloadType]
}>()

// Derived state — use computed, never methods
const derived = computed(() => /* transform props */)
</script>

<template>
  <!-- Use Tailwind utility classes exclusively -->
  <!-- Use shadcn-vue theme tokens: bg-background, text-foreground, border-border, etc. -->
</template>
```

## Rules
- Always `<script setup lang="ts">` — NEVER Options API
- Props: `defineProps<{...}>()` with TypeScript generics
- Emits: `defineEmits<{...}>()` with labeled tuple syntax
- Use `@/` import alias for all cross-directory imports
- Style with Tailwind CSS utilities only
- Use `cn()` from `@/lib/utils` if you need conditional class merging
- Keep the component focused on ONE responsibility
- NO business logic — delegate to composables/services
- Use existing shadcn-vue components from `@/components/ui/` for UI primitives

## Domain-Specific Guidance
- **challenge**: Display challenge/day/task state. Import types from `@/types/challenge`.
- **exchange**: Display exchange connection state. Import `ExchangeStatus` from `@/types/exchange`. Follow the discriminated union pattern (`v-if` on `status.state`).
- **layout**: Structural components using named slots. Minimal props.
