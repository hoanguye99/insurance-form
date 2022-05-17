import { LoginRequest, LoginResponse } from 'models/api';
import axiosClient from './axios-client';

const loginApi = {
  add(data: LoginRequest): Promise<LoginResponse> {
    const url = '/user/login';
    return axiosClient.post(url, data);
  }
};

export default loginApi;
