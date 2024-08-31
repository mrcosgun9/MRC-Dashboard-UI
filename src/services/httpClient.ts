import axios, { AxiosResponse } from "axios";
import { getSession, signOut } from "next-auth/react";
import AuthService from "./actions/auth";
export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    "content-type": "application/json",
  },
});

httpClient.interceptors.request.use(async (request) => {
  const session = await getSession();
  if (session) {
    request.headers.Authorization = `Bearer ${session?.user.accessToken}`;
  }
  return request;
});

httpClient.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const session = await getSession();
        console.log(session);
        
        const refreshToken =  session?.user.refreshToken; // Retrieve the stored refresh token.

        var response = await AuthService.refreshToken({refreshToken:refreshToken})
        const res = response.data;

        httpClient.defaults.headers.common['Authorization'] = `Bearer ${res.accessToken}`;
        return httpClient(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
 
);

const responseBody = <T>(response: AxiosResponse<T>) => response?.data;

export const useRequest = {
  get: <T>(url: string) => httpClient.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    httpClient
      .post<T>(url, body)
      .then(responseBody)
      .catch((err) => {
        return err;
      }),
  postWithToken: <T>(url: string, body: {}, token: string) =>
    httpClient
      .post<T>(url, body, { headers: { Authorization: `Bearer ${token}` } })
      .then(responseBody),
  put: <T>(url: string, body: {}) =>
    httpClient.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => httpClient.delete<T>(url).then(responseBody),
};
