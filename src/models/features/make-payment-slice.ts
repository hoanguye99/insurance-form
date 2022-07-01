import { MakePaymentResponse } from "models/api"

export interface MakePaymentState {
  makePayment: undefined | MakePaymentResponse
  status: 'idle' | 'loading' | 'failed' | 'init'
  failureDescription: string
}

export interface MakePaymentSliceRequest {
  amount: string
  bankCode?: string
  paymentMethod: string
  userId: number
  invoiceId: number
  invoiceCode: string
}