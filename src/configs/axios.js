import axios from 'axios';

let accessToken = '';

export const setAccessToken = (_accessToken) => {
    accessToken = _accessToken;
};

export const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT_BASE_URL || '',
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use(async (config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

client.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error?.response?.data || error);
    }
);
