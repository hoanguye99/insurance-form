import { LoginRequest, LoginResponse, RefreshTokenResponse } from 'models/api';
import { UserDetail } from 'models/features';
import axiosClient from './axios-client';

const imageUploadApi = {
  upload(data: LoginRequest): Promise<LoginResponse> {
    const url = '/ins-upload/?detectPlate=1';
    return axiosClient.post(url, data);
  },
};

export default imageUploadApi;
