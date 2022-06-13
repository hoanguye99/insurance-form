import { CreateGroupInsuranceOrderResponse, CreateOrderFormData } from 'models/api'

export interface OrderGroupState {
  orderGroup: [] | CreateOrderFormData[]
  status: 'idle' | 'loading' | 'failed'
  failureDescription: string
}
