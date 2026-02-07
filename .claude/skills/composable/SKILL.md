---
name: composable
description: Generate a new Vue composable following the ChallengeHub 3-layer pattern
argument-hint: <Name> (without "use" prefix, e.g. "Notifications")
disable-model-invocation: true
---

Create a new composable named `use$ARGUMENTS`.

## File Location
Create the file at: `src/composables/use$ARGUMENTS.ts`

## Required Pattern

```typescript
import { ref, computed } from 'vue'
import type { SomeType } from '@/types/domain'
import { someFunction } from '@/services/domain/serviceFile'

export function use$ARGUMENTS() {
  // Reactive state — one or two core refs
  const state = ref<SomeType>(initialValue)

  // Derived state — computed wrappers around service functions
  const derived = computed(() => someFunction(state.value))

  // Handlers — call service functions, assign results back to refs
  function handleAction(): void {
    state.value = pureFunction(state.value)
  }

  // Return public API
  return { state, derived, handleAction }
}
```

## CRITICAL Rules
1. Composables are THIN REACTIVE WRAPPERS. They hold `ref()` and `computed()` state.
2. ALL business logic MUST live in `src/services/`. The composable calls service functions.
3. Always use explicit return types on handler functions (`: void`, `: Promise<void>`, etc.).
4. Always export a single named function: `export function useSomething()`.
5. If the composable needs lifecycle hooks (`onMounted`, `onUnmounted`), import them from Vue.

## Reference Examples
- `useChallengeProgress.ts` — wraps `challengeEngine` service functions
- `useExchangeConnection.ts` — wraps `exchangeApi` with cockatiel resilience
- `useEventTracking.ts` — wraps `eventLogger` service
- `useCountdown.ts` — manages interval-based countdown (uses `onUnmounted` for cleanup)

## Corresponding Service
If a service file does not yet exist for this composable's domain, also create one at
`src/services/<domain>/<name>.ts` following the service pattern (pure TS, zero Vue imports).
