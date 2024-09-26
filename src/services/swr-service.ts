import { IBaseDataResponse } from "@/types/baseType";
import { httpClient } from "./httpClient"

const swrFetcher = async (url: string, body?: any) => {
  const res = await httpClient.post<IBaseDataResponse<any>>(url, {}).then(res => res.data);
  return res.data;
}
export {
  swrFetcher
}