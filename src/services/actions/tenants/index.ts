import { IBaseDataResponse } from "@/types/baseType";
import { httpClient } from "@/services/httpClient";
import { httpServer } from "@/services/httpServer";
import { TenantControlRequest, TenantControlResponse, TenantRequest, TenantResponse } from "./type";

const upsertTenant = async (
  data: TenantRequest
): Promise<IBaseDataResponse<TenantResponse>> => {
  return await httpServer
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
  return await httpClient
    .post<IBaseDataResponse<TenantControlResponse>>("Tenant/TenantControl", data )
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
  tenantControl
};
export default TenantService;
