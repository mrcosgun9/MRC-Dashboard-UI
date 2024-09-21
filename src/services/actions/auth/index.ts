import { IBaseDataResponse } from "@/types/baseType";
import { AuthenticationRequest, AuthenticationResponse, GetAuthenticationResponse, GetProfileInfoResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "./type";
import { httpClient } from "@/services/httpClient";
import { httpServer } from "@/services/httpServer";



const register = async (
  data: RegisterRequest
): Promise<IBaseDataResponse<RegisterResponse>> => {
  return await httpServer
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
const authentication = async (
  data: AuthenticationRequest
): Promise<IBaseDataResponse<AuthenticationResponse>> => {
  return await httpClient
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
  return await httpClient
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
