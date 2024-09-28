import { IBaseDataResponse } from "@/types/baseType";
import { AuthenticationRequest, AuthenticationResponse, GetAuthenticationResponse, GetProfileInfoResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "./type";
import { tenantHttpServer } from "@/services/tenant-http-server";
import { tenantHttpClient } from "@/services/tenant-http-client";



const register = async (
  data: RegisterRequest
): Promise<IBaseDataResponse<RegisterResponse>> => {
  return await tenantHttpServer
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
): Promise<IBaseDataResponse<LoginResponse>> => {
  return await tenantHttpClient
    .post<IBaseDataResponse<LoginResponse>>("Auth/Login", data)
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
}): Promise<IBaseDataResponse<GetProfileInfoResponse>> => {
  return await tenantHttpClient
    .post<IBaseDataResponse<GetProfileInfoResponse>>(
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
}): Promise<IBaseDataResponse<GetProfileInfoResponse>> => {
  return await tenantHttpServer
    .post<IBaseDataResponse<GetProfileInfoResponse>>(
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
const updateProfile = async (
  data: GetProfileInfoResponse
): Promise<IBaseDataResponse<GetProfileInfoResponse>> => {
  return await tenantHttpClient
    .post<IBaseDataResponse<GetProfileInfoResponse>>(
      "Auth/UpdateProfile",
      data
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
const authentication = async (
  data: AuthenticationRequest
): Promise<IBaseDataResponse<AuthenticationResponse>> => {
  return await tenantHttpClient
    .post<IBaseDataResponse<AuthenticationResponse>>(
      "v1/authentication",
      data
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
const getAuthenticationClient = async (data: {
  accessToken?: string;
}): Promise<IBaseDataResponse<GetAuthenticationResponse>> => {
  return await tenantHttpClient
    .get<IBaseDataResponse<GetAuthenticationResponse>>(
      "v1/authentication",
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
const AuthService = {
  register,
  login,
  getProfileInfo,
  getProfileInfoClient,
  updateProfile,
  authentication,
  getAuthenticationClient
};
export default AuthService;
