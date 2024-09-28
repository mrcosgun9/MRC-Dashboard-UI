import axios, { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
export const tenantHttpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    "content-type": "application/json",
  },
});

tenantHttpClient.interceptors.request.use(async (request) => {
  const session = await getSession();
  if (session) {
    request.headers.Authorization = `Bearer ${session?.user.accessToken}`;
  }
  return request;
});

tenantHttpClient.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response?.data;

export const useRequest = {
  get: <T>(url: string) => tenantHttpClient.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    tenantHttpClient
      .post<T>(url, body)
      .then(responseBody)
      .catch((err) => {
        return err;
      }),
  postWithToken: <T>(url: string, body: {}, token: string) =>
    tenantHttpClient
      .post<T>(url, body, { headers: { Authorization: `Bearer ${token}` } })
      .then(responseBody),
  put: <T>(url: string, body: {}) =>
    tenantHttpClient.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => tenantHttpClient.delete<T>(url).then(responseBody),
};
