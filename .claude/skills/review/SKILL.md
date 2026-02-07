---
name: review
description: Review code for ChallengeHub architecture pattern compliance. Use when checking if code follows the 3-layer pattern, TypeScript strictness, or component conventions.
allowed-tools: Read, Grep, Glob
---

Review the current codebase (or the files specified in `$ARGUMENTS`) for compliance with ChallengeHub architecture patterns.

## Checks to Perform

### 1. Service Layer Purity
Scan all files in `src/services/**/*.ts` for Vue imports:
- Search for: `from 'vue'`, `from "vue"`
- **VIOLATION** if any Vue reactivity imports found (`ref`, `computed`, `watch`, `reactive`, etc.)

### 2. Composable Pattern Compliance
Scan all files in `src/composables/*.ts`:
- Must export exactly one function named `use*`
- Must import from `@/services/` for business logic
- Should be thin wrappers, not containing complex logic

### 3. Component Pattern Compliance
Scan `src/components/**/*.vue` (excluding `src/components/ui/`):
- Must use `<script setup lang="ts">`
- Must use `defineProps<{...}>()` with TypeScript generics
- Must use `defineEmits<{...}>()` with typed signatures
- Should NOT contain business logic

### 4. Type Safety
- Check for `any` usage in all `.ts` and `.vue` files
- Verify `import type` for type-only imports
- Check explicit return types on service functions

### 5. Import Alias Consistency
- All cross-directory imports should use `@/` alias, not relative `../../` paths

## Output Format
For each check, report: PASS / FAIL / WARNING with specific files and lines for any violations.
