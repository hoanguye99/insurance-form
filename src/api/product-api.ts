import { useAppSelector } from 'app/hooks';
import { selectUserDetail } from 'features/auth/user-login-slice';
import { GetAllProductTypeResponse } from 'models/api';
import { UserDetail } from 'models/features';
import axiosClient from './axios-client';

const productApi = {
  getAllProductTypes(userDetail: UserDetail): Promise<GetAllProductTypeResponse> {
    const config = {
      headers: {
        token: userDetail.accessToken,
      },
    }
    const url = '/ins-type';
    return axiosClient.get(url, config);
  }
};

export default productApi;
