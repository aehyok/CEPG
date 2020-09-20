import axios from 'axios';
import { message } from 'antd';

export interface AjaxResponse<T> {
  code: number;
  data: T;
  message: string;
}

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/proxy' : '/',
  timeout: 10 * 60 * 1000,
});

axiosInstance.interceptors.request.use(config => {
  config.headers = {
    Authorization: (window as any).g_app._store.getState().project.token,
  };
  return config;
});

axiosInstance.interceptors.response.use(
  response => {
    const data = response.data;

    if (data.code !== 0) {
      throw Error(data.message);
    }
    return data;
  },
  error => {
    message.error(error.message || '服务器异常');
    return Promise.reject(error);
  },
);

export default axiosInstance;
