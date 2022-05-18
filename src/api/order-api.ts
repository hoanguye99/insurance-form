import { GetAllProductTypeResponse } from 'models/api';
import { CreateOrderFormData } from 'models/api/order-api';
import { UserDetail } from 'models/features';
import axiosClient from './axios-client';

const orderApi = {

  createInsuranceOrder(orderDetail: CreateOrderFormData, userDetail: UserDetail): Promise<any> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = '/ins';
    return axiosClient.post(url, orderDetail, config);
  }

};

export default orderApi;
