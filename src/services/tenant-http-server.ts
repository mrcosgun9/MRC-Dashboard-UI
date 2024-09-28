import { authOptions } from "@/configs/next-auth";
import axios, { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";

export const tenantHttpServer = axios.create({
  baseURL: process.env.BASE_API,
  headers: {
    "content-type": "application/json",
  },
});

tenantHttpServer.interceptors.request.use(async (request) => {
  const session = await getServerSession(authOptions);
  if (session) {
    request.headers.Authorization = `Bearer ${session?.user.accessToken}`;
  }
  return request;
});

tenantHttpServer.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response?.data;

export const useRequest = {
  get: <T>(url: string) => tenantHttpServer.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    tenantHttpServer
      .post<T>(url, body)
      .then(responseBody)
      .catch((err) => {
        return err;
      }),
  postWithToken: <T>(url: string, body: {}, token: string) =>
    tenantHttpServer
      .post<T>(url, body, { headers: { Authorization: `Bearer ${token}` } })
      .then(responseBody),
  put: <T>(url: string, body: {}) =>
    tenantHttpServer.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => tenantHttpServer.delete<T>(url).then(responseBody),
};
