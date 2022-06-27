import { AddCartResponse, CreateCartResponse, GetLatestCartDetailResponse } from "models/api"
import { UserDetail } from "models/features"
import axiosClient from "./axios-client"



const cartApi = {

  createCart(userDetail: UserDetail, insId: string, amount: number): Promise<CreateCartResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      }
    }
    const url = '/ins/order'
    return axiosClient.post(url, {insId, amount}, config)
  },

  addCart(userDetail: UserDetail, insId: string, amount: number, orderId: string): Promise<AddCartResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      }
    }
    const url = `/ins/order${orderId}`
    return axiosClient.put(url, {insId, amount}, config)
  },

  deleteCartItem(userDetail: UserDetail, id: string): Promise<any> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      }
    }
    const url = `/ins/order/items/${id}`
    return axiosClient.delete(url, config)
  },

  deleteCart(userDetail: UserDetail, orderId: string): Promise<any> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      }
    }
    const url = `/ins/order/items/all/${orderId}`
    return axiosClient.delete(url, config)
  },

  getLatestCartDetail(
    userDetail: UserDetail
  ): Promise<GetLatestCartDetailResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      }
    }
    const url = '/ins/order'
    return axiosClient.get(url, config)
  },

}

export default cartApi
