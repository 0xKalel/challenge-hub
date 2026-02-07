---
name: ui
description: Add a shadcn-vue UI component to the project
argument-hint: <component-name> (e.g. "dialog", "tabs", "tooltip")
disable-model-invocation: true
allowed-tools: Bash(npx shadcn-vue@latest *)
---

Add the shadcn-vue component `$ARGUMENTS` to the project.

## Steps
1. Run: `npx shadcn-vue@latest add $ARGUMENTS`
2. The component will be generated into `src/components/ui/$ARGUMENTS/`
3. Verify the component was added by checking the directory contents
4. Report which files were created

## Important
- shadcn-vue components are auto-generated and must NEVER be manually edited afterward.
- The project uses the **new-york** style variant.
- Components use `cn()` from `@/lib/utils` for class merging.
- The component registry is configured in `components.json` at the project root.
