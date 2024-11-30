import { IBaseDataResponse, IBaseDatasResponse } from "@/types/baseType";
import { httpClient } from "@/services/http-client";
import { httpServer } from "@/services/http-server";
import { TenantControlRequest, TenantControlResponse, TenantRequest, TenantResponse } from "./type";
import { tenantHttpClient } from "@/services/tenant-http-client";

const upsertTenant = async (
  data: TenantRequest
): Promise<IBaseDataResponse<TenantResponse>> => {
  return await tenantHttpClient
    .post<IBaseDataResponse<TenantResponse>>("Tenant/UpsertTenant", data, { headers: { Authorization: `Bearer ${data.accessToken}` } })
    .then((response) => {
      const { data: res } = response;
      return res;
    })
    .catch((err) => {
      return err;
    })
    .finally();
};

const tenantControl = async (
  data: TenantControlRequest
): Promise<IBaseDataResponse<TenantControlResponse>> => {
  return await tenantHttpClient
    .post<IBaseDataResponse<TenantControlResponse>>("Tenant/TenantControl", data)
    .then((response) => {
      const { data: res } = response;
      return res;
    })
    .catch((err) => {
      return err;
    })
    .finally();
};
const getTenantList = async (): Promise<IBaseDatasResponse<TenantResponse>> => {
  return await tenantHttpClient
    .post<IBaseDatasResponse<TenantResponse>>("Tenant/GetTenantList", {})
    .then((response) => {
      const { data: res } = response;
      return res;
    })
    .catch((err) => {
      return err;
    })
    .finally();
};

const TenantService = {
  upsertTenant,
  tenantControl,
  getTenantList
};
export default TenantService;
