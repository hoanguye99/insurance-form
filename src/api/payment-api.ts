import { GetListBankResponse, GetPaymentMethodResponse, MakeOneClickPaymentRequest, MakeOneClickPaymentResponse, MakePaymentRequest, MakePaymentResponse } from 'models/api'
import { UserDetail } from 'models/features'
import paymentClient from './payment-client'

const paymentApi = {
  getListBank(): Promise<GetListBankResponse> {
    const url = '/banks'
    return paymentClient.get(url)
  },

  getPaymentMethod(userId:string): Promise<GetPaymentMethodResponse> {
    const url = `/payment-methods/${userId}/`
    return paymentClient.get(url)
  },

  makePayment(
    data: MakePaymentRequest
  ): Promise<MakePaymentResponse> {
    const url = '/payment/'
    return paymentClient.post(url, data)
  },

  makeOneClickPayment(
    data: MakeOneClickPaymentRequest
  ): Promise<MakeOneClickPaymentResponse> {
    const url = '/one-click-payment/'
    return paymentClient.post(url, data)
  },

}

export default paymentApi
