---
name: fix
description: Find and fix TypeScript type errors and build failures
disable-model-invocation: true
allowed-tools: Bash(npx vue-tsc *), Bash(npm run build), Read, Grep, Glob
---

Find and fix all TypeScript and build errors in the project.

## Process

1. **Run Type Check**: Execute `npx vue-tsc -b --noEmit 2>&1` and capture all errors.

2. **Categorize Errors**: Group by type:
   - Missing type imports
   - Type mismatches
   - Unused variables/parameters
   - Missing return types
   - Template type errors

3. **Fix Each Error**: Read the file, understand context, apply fix following project patterns:
   - Use `import type` for type-only imports
   - Use proper Vue generic syntax for props/emits
   - Use `readonly` for immutable properties
   - Ensure services have NO Vue imports
   - Do NOT edit files in `src/components/ui/`

4. **Verify**: Run `npx vue-tsc -b --noEmit` again to confirm zero errors.

5. **Build Check**: Run `npm run build` to verify production build succeeds.

6. **Report**: List all changes made and confirm clean build.
