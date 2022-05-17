import { LoginRequest, LoginResponse } from 'models/api';
import axiosClient from './axios-client';

const loginApi = {
  login(data: LoginRequest): Promise<LoginResponse> {
    const url = '/login';
    return axiosClient.post(url, data);
  }
};

export default loginApi;
