import axios, { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
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
  (error) => {
    return Promise.reject(error);
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
