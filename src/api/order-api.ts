import { CreateOrderFormData, GetAllInsuranceOrdersResponse, InsuranceOrder } from 'models/api';
import { UserDetail } from 'models/features';
import axiosClient from './axios-client';

const orderApi = {

  createInsuranceOrder(orderDetail: CreateOrderFormData, userDetail: UserDetail): Promise<InsuranceOrder> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = '/ins';
    return axiosClient.post(url, orderDetail, config);
  },

  getAllInsuranceOrders(userDetail: UserDetail): Promise<GetAllInsuranceOrdersResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = '/ins';
    return axiosClient.get(url, config);
  },

  approveInsuranceOrder(id: string, userDetail: UserDetail): Promise<any> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/admin/ins/${id}/apply`;
    return axiosClient.put(url, {hello: "world"}, config);
  },

  rejectInsuranceOrder(id: string, userDetail: UserDetail): Promise<any> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = `/ins/${id}`;
    return axiosClient.delete(url, config);
  },

};

export default orderApi;
