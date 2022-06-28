import { ConfirmCartResponse } from "models/api"

export interface CartConfirmState {
  cartConfirmResponse: undefined | ConfirmCartResponse
  status: 'idle' | 'loading' | 'failed' | 'init'
  failureDescription: string
}
