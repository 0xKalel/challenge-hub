---
name: check
description: Run TypeScript type checking and production build verification
disable-model-invocation: true
allowed-tools: Bash(npx vue-tsc *), Bash(npm run build)
---

Run the full type-check and build pipeline.

## Steps

1. **Type Check**: Run `npx vue-tsc -b --noEmit` to verify all TypeScript types are correct.
   - If there are errors, list them clearly and suggest fixes.
   - Pay attention to: missing imports, type mismatches, unused variables.

2. **Production Build**: Run `npm run build` to verify the Vite build succeeds.
   - If the build fails, analyze the error output.
   - Common issues: import resolution, missing dependencies, template compilation errors.

3. **Report Results**: Summarize what passed and what failed. For failures, provide specific fix suggestions referencing the project's architecture patterns.
