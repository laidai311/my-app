import axios from 'axios';

let accessToken = '';

export const setAccessToken = (_accessToken) => {
  accessToken = _accessToken;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error?.response?.data || error);
  }
);
