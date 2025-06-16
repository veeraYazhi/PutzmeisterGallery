import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import type { AxiosError } from 'axios';
import { API } from '../constants';

interface ApiResponse {
  code?: string | number;
  message?: string;
  [key: string]: any;
}

// API Error types
export interface ApiError {
  status?: number;
  code?: string | number;
  message: string;
  details?: any;
}

// Create Axios instance with base config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API.FLICKR.PUBLIC_FEED_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add common params to axios defaults
axiosInstance.defaults.params = {
  format: API.FLICKR.FORMAT,
  nojsoncallback: API.FLICKR.NO_JSON_CALLBACK,
};

// Request interceptor
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Add any common headers or params here
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.message,
      details: error.response?.data
    };

    if (error.response) {
      const responseData = error.response.data as ApiResponse;
      apiError.status = error.response.status;
      apiError.code = responseData.code;
      console.error('Server Error:', apiError);
    } else if (error.request) {
      apiError.status = 0;
      console.error('Network Error:', apiError);
    } else {
      console.error('Error:', apiError);
    }

    return Promise.reject(apiError);
  }
);

// API configuration
export const API_CONFIG = {
  flickr: {
    baseUrl: API.FLICKR.PUBLIC_FEED_URL,
    endpoints: {
      photosPublic: '', // No additional endpoint needed as it's already in the base URL
    },
    axios: axiosInstance,
  },
};

export type ApiConfig = typeof API_CONFIG;
