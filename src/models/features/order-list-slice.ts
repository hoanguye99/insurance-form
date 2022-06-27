import { GetAllInsuranceOrdersResponse } from 'models/api'

export interface OrderListState {
  orderList: {} | GetAllInsuranceOrdersResponse
  status: 'idle' | 'loading' | 'failed' | 'init'
  failureDescription: string
}
