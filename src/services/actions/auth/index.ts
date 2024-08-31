import { IBaseDataResponse } from "@/types/baseType";
import { GetProfileInfoResponse, LoginRequest, LoginResponse, RefreshTokenRequest, RegisterRequest, RegisterResponse } from "./type";
import { httpClient } from "@/services/httpClient";
import { httpServer } from "@/services/httpServer";

 

const register = async (
  data: RegisterRequest
): Promise<IBaseDataResponse<RegisterResponse>> => {
  data.fullName = `${data.name} ${data.lastName}`;
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
): Promise<IBaseDataResponse<LoginResponse>> => {
  return await httpClient
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
const refreshToken = async (
  data: RefreshTokenRequest
): Promise<IBaseDataResponse<LoginResponse>> => {
  return await httpClient
    .post<IBaseDataResponse<LoginResponse>>("Auth/RefreshToken", data)
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
  return await httpClient
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
  return await httpServer
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
  return await httpClient
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
const AuthService = {
  register,
  login,
  getProfileInfo,
  getProfileInfoClient,
  updateProfile,
  refreshToken
};
export default AuthService;
