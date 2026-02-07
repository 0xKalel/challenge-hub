<template>
  <div class="min-h-screen bg-background">
    <slot name="header" />
    <main class="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <slot name="summary" />
      <slot name="banner" />
      <slot name="board" />
      <slot name="completion" />
    </main>
  </div>
</template>
