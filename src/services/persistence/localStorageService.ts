import type { ChallengeState } from '@/types/challenge'

const STORAGE_KEY = 'challengehub_state'

export function saveState(state: ChallengeState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Silently fail if localStorage is full or unavailable
  }
}

export function loadState(): ChallengeState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!isValidState(parsed)) return null
    return parsed
  } catch {
    return null
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Silently fail
  }
}

function isValidState(value: unknown): value is ChallengeState {
  if (typeof value !== 'object' || value === null) return false
  const obj = value as Record<string, unknown>
  if (!Array.isArray(obj.days)) return false
  if (typeof obj.startedAt !== 'number') return false
  return obj.days.length > 0
}
