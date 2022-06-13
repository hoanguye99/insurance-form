import { CreateGroupInsuranceOrderResponse } from "models/api"

export interface OrderGroupCreateState {
  orderGroupCreateResponse: undefined | CreateGroupInsuranceOrderResponse
  status: 'idle' | 'loading' | 'failed'
  failureDescription: string
}
