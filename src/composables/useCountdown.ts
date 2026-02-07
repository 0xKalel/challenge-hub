import { ref, onUnmounted } from 'vue'

export function useCountdown() {
  const remainingMs = ref(0)
  const isActive = ref(false)
  let intervalId: ReturnType<typeof setInterval> | null = null

  function tick(targetTimestamp: number): void {
    const diff = targetTimestamp - Date.now()
    if (diff <= 0) {
      remainingMs.value = 0
      stop()
      return
    }
    remainingMs.value = diff
  }

  function start(targetTimestamp: number): void {
    stop()
    isActive.value = true
    tick(targetTimestamp)
    intervalId = setInterval(() => tick(targetTimestamp), 250)
  }

  function stop(): void {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
    isActive.value = false
  }

  onUnmounted(stop)

  return { remainingMs, isActive, start, stop }
}
