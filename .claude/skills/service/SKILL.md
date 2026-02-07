---
name: service
description: Generate a new pure TypeScript service following ChallengeHub patterns
argument-hint: <serviceName> <domain: api|challenge|tracking|new-domain>
disable-model-invocation: true
---

Create a new pure TypeScript service named `$0` in the `$1` domain.

## File Location
Create the file at: `src/services/$1/$0.ts`

## Required Pattern

```typescript
import type { SomeType, AnotherType } from '@/types/domain'

// Pure functions only — NO Vue imports, NO ref, NO computed, NO watch

export function doSomething(input: SomeType): AnotherType {
  // Transform input and return new value
  // Use immutable patterns: spread operators, Array.map, Array.filter
  return { ...input, modified: true }
}

export function computeResult(state: SomeType): DerivedType {
  // Derive values from state
  return { /* derived data */ }
}
```

## CRITICAL Rules
1. **ZERO Vue imports.** No `ref`, `computed`, `watch`, `onMounted`, `reactive`, `readonly`, etc.
2. Pure functions only. Same input = same output.
3. Immutable patterns: return new objects via spread, use `Array.map()` not `Array.push()`.
4. Explicit parameter types and return types on ALL functions.
5. Import types from `@/types/` — never define domain types inline.
6. Export individual named functions, not classes or default exports.

## Reference Examples
- `services/challenge/challengeEngine.ts` — `toggleTask(state, taskId): ChallengeState`
- `services/api/exchangeApi.ts` — `connectExchange(): Promise<ExchangeApiResult>`
- `services/tracking/eventLogger.ts` — `logEvent(name, payload): void`
