# ChallengeHub

A Vue 3 + TypeScript application where users complete a 5-day trading challenge. Each day has tasks that must be completed before unlocking the next day, including a simulated exchange connection that randomly fails ~30% of the time.

## How to Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

To build for production:

```bash
npm run build
npm run preview
```

## Architecture

The app uses a 6-layer architecture with strict separation of concerns:

```
Types → Constants → Services (pure TS) → Composables (thin Vue wrappers) → Components → App.vue
```

- **Services** (`src/services/`) are pure TypeScript with zero Vue imports — unit-testable without any framework
- **Composables** are thin reactive wrappers (~30-50 lines each) that delegate all logic to services
- **Components** are small and focused — the largest template is ~30 lines
- **App.vue** is a pure orchestrator with zero business logic, only wiring

Key libraries used to reduce code:
- **shadcn-vue** — pre-built accessible UI components (Button, Card, Alert, Badge, Progress, Checkbox, Collapsible, Skeleton)
- **cockatiel** — production-grade retry with exponential backoff + circuit breaker in ~5 lines of config
- **lucide-vue-next** — tree-shakeable icon library

## Shortcuts & Trade-offs

- **No persistent state**: Challenge progress resets on page refresh. In production, this would be backed by an API/database.
- **Mock API only**: The exchange connection is a `setTimeout` with `Math.random()`. A real implementation would hit an actual exchange endpoint and handle OAuth flows.
- **No unit tests**: Given the time constraint, I prioritized architecture and working features over test coverage. The pure service functions (`challengeEngine.ts`, etc.) are designed to be trivially testable — they take state in and return state out with no side effects.
- **Circuit breaker timing is local**: The 30-second cooldown uses `Date.now()` and resets on refresh. Production would persist breaker state.
- **No route-based navigation**: Single-page layout with collapsible cards instead of per-day routes. Adequate for 5 days but would need routing for larger challenges.

## AI Usage

- AI (Claude) was used to scaffold the initial project structure, generate boilerplate component templates, and write the service layer implementations.
- I reviewed and modified the generated code extensively: fixed the Reka UI checkbox API (`modelValue` vs `checked`), designed the layered architecture with pure TS services vs thin composables, chose the library stack (shadcn-vue, cockatiel, lucide) to reduce hand-written code by ~40%, and wired the cross-domain communication via callback injection in composables.
