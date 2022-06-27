import { InsuranceOrder } from "models/api"

export interface OrderCreateState {
  orderCreateResponse: {} | InsuranceOrder
  status: 'idle' | 'loading' | 'failed' | 'init'
  failureDescription: string
}
