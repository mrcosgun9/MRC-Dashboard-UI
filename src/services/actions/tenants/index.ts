import { IBaseDataResponse } from "@/types/baseType";
import { GetTenantInfoResponse, LoginRequest, RegisterRequest, RegisterResponse, TokenData } from "./type";
import { httpClient } from "@/services/httpClient";
import { httpServer } from "@/services/httpServer";



const register = async (
  data: RegisterRequest
): Promise<IBaseDataResponse<RegisterResponse>> => {
  return await httpClient
    .post<IBaseDataResponse<RegisterResponse>>("Auth/Register", data)
    .then((response) => {
      const { data: res } = response;
      return res;
    })
    .catch((err) => {
      return err;
    })
    .finally();
};
const login = async (
  data: LoginRequest
): Promise<IBaseDataResponse<TokenData>> => {
  return await httpClient
    .post<IBaseDataResponse<TokenData>>("Auth/Login", data)
    .then((response) => {
      const { data: res } = response;
      return res;
    })
    .catch((err) => {
      return err;
    })
    .finally();
};
const getProfileInfoClient = async (data: {
  accessToken?: string;
}): Promise<IBaseDataResponse<GetTenantInfoResponse>> => {
  return await httpClient
    .post<IBaseDataResponse<GetTenantInfoResponse>>(
      "Auth/GetProfileInfo",
      {},
      { headers: { Authorization: `Bearer ${data.accessToken}` } }
    )
    .then((response) => {
      const { data: res } = response;
      return res;
    })
    .catch((err) => {
      return err;
    })
    .finally();
};
const getProfileInfo = async (data: {
  accessToken?: string;
}): Promise<IBaseDataResponse<GetTenantInfoResponse>> => {
  return await httpServer
    .post<IBaseDataResponse<GetTenantInfoResponse>>(
      "Auth/GetProfileInfo",
      {},
      { headers: { Authorization: `Bearer ${data.accessToken}` } }
    )
    .then((response) => {
      const { data: res } = response;
      return res;
    })
    .catch((err) => {
      console.log("❌ Auth/GetProfileInfo", err);

      return err;
    })
    .finally();
};
 
const TenantService = {
  register,
  login,
  getProfileInfoClient,
  getProfileInfo
};
export default TenantService;
