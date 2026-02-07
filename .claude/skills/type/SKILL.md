---
name: type
description: Generate TypeScript type definitions following ChallengeHub patterns
argument-hint: <domain> (e.g. "notifications", "leaderboard")
disable-model-invocation: true
---

Create TypeScript type definitions for the `$ARGUMENTS` domain.

## File Location
Create the file at: `src/types/$ARGUMENTS.ts`

## Required Patterns

### Use `readonly` for identity/immutable properties
```typescript
export interface SomeEntity {
  readonly id: string
  readonly name: string
  mutableField: boolean  // only mutable for fields that change
}
```

### Use discriminated unions for state machines
```typescript
export type SomeStatus =
  | { readonly state: 'idle' }
  | { readonly state: 'loading' }
  | { readonly state: 'success'; readonly data: ResultType }
  | { readonly state: 'error'; readonly message: string }
```

### Use string literal union types instead of enums
```typescript
export type TaskType = 'standard' | 'exchange'
export type DayStatus = 'locked' | 'unlocked' | 'in-progress' | 'completed'
```

## Rules
1. `readonly` on all properties that should not change after creation.
2. Discriminated unions (with `state` discriminant) for state machines.
3. String literal unions instead of TypeScript `enum`.
4. `export type` for aliases, `export interface` for object shapes.
5. One file per domain under `src/types/`.
6. No `any` — use `unknown` or `Record<string, unknown>` for flexible payloads.

## Reference Files
- `src/types/challenge.ts` — `DayStatus`, `TaskType`, `Task`, `Day`, `ChallengeState`, `ChallengeProgress`
- `src/types/exchange.ts` — `ExchangeStatus` (discriminated union), `ExchangeApiResult`
- `src/types/tracking.ts` — `TrackingEventName`, `TrackingEvent`
