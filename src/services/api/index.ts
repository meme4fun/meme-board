import axios from 'axios';
import merge from 'lodash/merge';
import qs from 'qs';
import userStore from '@/store/user.store';

const AxiosRequest = axios.create({
  baseURL: '/',
  withCredentials: true,
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  },
});

AxiosRequest.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.headers = config.headers || {};
  // TODO: add token
  if (userStore.currentAuthToken) {
    config.headers['Authorization'] = `Bearer ${userStore.currentAuthToken}`;
  }

  if (config.headers?.['Content-Type'] !== 'multipart/form-data') {
    config.params = merge({}, config.params, {});
    config.data = merge({}, config?.data ?? {}, {});
  }
  return config;
});

AxiosRequest.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.data?.msg === 'ok') {
      return response.data.data;
    } else {
      return Promise.reject({
        code: response.data.status,
        message: response.data?.msg?.toString(),
        ...response.data,
      });
    }
  },
  (err) => {
    if (err.response?.status === 401) {
      // TODO: 401
      console.log('error 401:', err.response?.status);
    }
    throw err;
  },
);

export default AxiosRequest;
