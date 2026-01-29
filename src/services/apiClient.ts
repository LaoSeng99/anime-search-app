import axios, { type AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.group(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
      );
      console.log('Params:', config.params);
      console.groupEnd();
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 429) {
      console.error('Too many requests! Jikan API rate limit hit.');
      // 这里可以集成一个 Toast 通知用户“请求太频繁，请稍后再试”
    }

    if (status === 404) {
      console.error('Resource not found.');
    }

    return Promise.reject(error);
  },
);

export default apiClient;
