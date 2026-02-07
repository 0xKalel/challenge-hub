export type ExchangeStatus =
  | { readonly state: 'idle' }
  | { readonly state: 'connecting'; readonly attempt: number }
  | { readonly state: 'success'; readonly exchangeId: string }
  | { readonly state: 'error'; readonly message: string; readonly attempt: number }
  | { readonly state: 'circuit-open'; readonly reopensAt: number }

export interface ExchangeApiResult {
  readonly connected: boolean
  readonly exchangeId?: string
}
