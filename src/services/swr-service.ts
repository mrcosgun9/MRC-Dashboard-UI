import { IBaseDataResponse } from "@/types/baseType";
import { httpClient } from "./http-client"
import { tenantHttpClient } from "./tenant-http-client";

const swrTenantFetcher = async (url: string, body?: any) => {
  const res = await tenantHttpClient.post<IBaseDataResponse<any>>(url, {}).then(res => res.data);
  return res.data;
}
const swrFetcher = async (url: string, body?: any, headers?: any) => {
  const res = await httpClient.post<IBaseDataResponse<any>>(url, {}, { headers: headers }).then(res => res.data);
  return res.data;
}
export {
  swrFetcher,
  swrTenantFetcher
}