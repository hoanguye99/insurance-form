import {
  CreateGroupInsuranceOrderResponse,
  CreateOrderFormData,
  GetAllInsuranceOrdersResponse,
  InsuranceOrder,
} from 'models/api'
import { UserDetail } from 'models/features'
import axiosClient from './axios-client'

const orderApi = {
  createInsuranceOrder(
    orderDetail: CreateOrderFormData,
    userDetail: UserDetail
  ): Promise<InsuranceOrder> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = '/ins'
    return axiosClient.post(url, orderDetail, config)
  },

  createGroupInsuranceOrder(
    groupOrder: CreateOrderFormData[],
    userDetail: UserDetail
  ): Promise<CreateGroupInsuranceOrderResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = '/ins'
    return axiosClient.post(url, groupOrder, config)
  },

  getAllInsuranceOrders(
    userDetail: UserDetail
  ): Promise<GetAllInsuranceOrdersResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
      params: { pageIndex: 0, size: 10000 },
    }
    const url = '/ins'
    return axiosClient.get(url, config)
  },

  approveInsuranceOrder(id: string, userDetail: UserDetail): Promise<any> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/admin/ins/${id}/apply`
    return axiosClient.put(url, { hello: 'world' }, config)
  },

  rejectInsuranceOrder(id: string, userDetail: UserDetail): Promise<any> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/ins/${id}`
    return axiosClient.delete(url, config)
  },

  updateInsuranceOrder(
    id: string,
    orderDetail: CreateOrderFormData,
    userDetail: UserDetail
  ): Promise<any> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/ins/${id}`
    return axiosClient.put(url, orderDetail, config)
  },
}

export default orderApi
