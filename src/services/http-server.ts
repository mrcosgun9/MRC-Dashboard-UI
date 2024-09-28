import { authOptions } from "@/configs/next-auth";
import axios, { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";

export const httpServer = axios.create({
  baseURL: process.env.BASE_SHOPPING_API,
  headers: {
    "content-type": "application/json",
  },
});

httpServer.interceptors.request.use(async (request) => {
  const session = await getServerSession(authOptions);
  if (session) {
    request.headers.Authorization = `Bearer ${session?.user.accessToken}`;
    request.headers["X-Alias-Id"] = session?.user.id;
  }
  return request;
});

httpServer.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response?.data;

export const useRequest = {
  get: <T>(url: string) => httpServer.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    httpServer
      .post<T>(url, body)
      .then(responseBody)
      .catch((err) => {
        return err;
      }),
  postWithToken: <T>(url: string, body: {}, token: string) =>
    httpServer
      .post<T>(url, body, { headers: { Authorization: `Bearer ${token}` } })
      .then(responseBody),
  put: <T>(url: string, body: {}) =>
    httpServer.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => httpServer.delete<T>(url).then(responseBody),
};
