import { MakeOneClickPaymentResponse } from "models/api"

export interface MakeOneClickPaymentState {
  makeOneClickPayment: undefined | MakeOneClickPaymentResponse
  status: 'idle' | 'loading' | 'failed' | 'init'
  failureDescription: string
}

export interface MakeOneClickPaymentSliceRequest {
  amount: string
  cardUid: string
  userId: number
  invoiceId: number
  invoiceCode: string
}