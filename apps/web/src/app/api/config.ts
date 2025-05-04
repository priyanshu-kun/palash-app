import axios from "axios";
import { getAccessToken } from "@/app/utils/save-token";
  
const BASE_URL = 'http://localhost:8080/api/v1';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': "application/json",
        'Accept': 'application/json'
    },
    withCredentials: true
});

// Token storage keys
const ACCESS_TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';

// Request interceptor to add the auth token
api.interceptors.request.use(
    async (config) => {
        // Don't add token for auth endpoints
        if (
            config.url?.includes('/users/auth/sign-up') ||
            config.url?.includes('/users/auth/sign-in') ||
            config.url?.includes('/users/auth/verify-signup-otp')||
            config.url?.includes('/users/auth/verify-signin-otp')||
            config.url?.includes('/users/auth/refresh-token')
        ) {
            return config;
        }

        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;