import { LoginRequest, LoginResponse } from 'models/api';
import axiosClient from './axios-client';

const loginApi = {
  add(data: LoginRequest): Promise<LoginResponse> {
    console.log('In Add')
    const url = '/user/login';
    return axiosClient.post(url, data);
  }
};

export default loginApi;
