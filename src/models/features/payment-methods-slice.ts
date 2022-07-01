import {  GetPaymentMethodResponse } from "models/api"

export interface PaymentMethodsState {
  paymentMethods: undefined | GetPaymentMethodResponse
  status: 'idle' | 'loading' | 'failed' | 'init'
  failureDescription: string
}
