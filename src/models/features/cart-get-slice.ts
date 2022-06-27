import { GetLatestCartDetailResponse } from "models/api"

export interface CartGetState {
  cart: undefined | GetLatestCartDetailResponse
  status: 'idle' | 'loading' | 'failed' | 'init'
  failureDescription: string
}
