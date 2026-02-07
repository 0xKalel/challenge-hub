<script setup lang="ts">
import type { ExchangeStatus } from '@/types/exchange'
import ExchangeIdle from './ExchangeIdle.vue'
import ExchangeConnecting from './ExchangeConnecting.vue'
import ExchangeSuccess from './ExchangeSuccess.vue'
import ExchangeError from './ExchangeError.vue'
import ExchangeCircuitOpen from './ExchangeCircuitOpen.vue'

defineProps<{
  status: ExchangeStatus
}>()

defineEmits<{
  connect: []
}>()
</script>

<template>
  <div role="status" aria-live="polite">
    <Transition name="fade" mode="out-in">
      <ExchangeIdle
        v-if="status.state === 'idle'"
        key="idle"
        @connect="$emit('connect')"
      />
      <ExchangeConnecting
        v-else-if="status.state === 'connecting'"
        key="connecting"
        :attempt="status.attempt"
      />
      <ExchangeSuccess
        v-else-if="status.state === 'success'"
        key="success"
        :exchange-id="status.exchangeId"
      />
      <ExchangeError
        v-else-if="status.state === 'error'"
        key="error"
        :message="status.message"
        :attempt="status.attempt"
        @retry="$emit('connect')"
      />
      <ExchangeCircuitOpen
        v-else-if="status.state === 'circuit-open'"
        key="circuit-open"
        :reopens-at="status.reopensAt"
        @retry="$emit('connect')"
      />
    </Transition>
  </div>
</template>
