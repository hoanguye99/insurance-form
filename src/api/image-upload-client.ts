import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const imageUploadClient = axios.create({
  baseURL: process.env.REACT_APP_IMAGE_UPLOAD_DOMAIN,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Add a request interceptor
imageUploadClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
imageUploadClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default imageUploadClient;
