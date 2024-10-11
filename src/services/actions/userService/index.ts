import { IBaseDataResponse, IBaseDatasResponse } from "@/types/baseType";
import { httpClient } from "@/services/httpClient";
import { CreateUserRequest, CreateUserResponse, GetAllOnlineUserResponse } from "./type";

const getAllOnlineUser = async (): Promise<IBaseDatasResponse<GetAllOnlineUserResponse>> => {
  return await httpClient
    .post<IBaseDatasResponse<GetAllOnlineUserResponse>>(
      "User/GetAllOnlineUser",
      {}
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
const createUser = async (
  data: CreateUserRequest
): Promise<IBaseDataResponse<CreateUserResponse>> => {
  data.fullName = `${data.name} ${data.lastName}`;
  return await httpClient
    .post<IBaseDataResponse<CreateUserResponse>>("User/CreateUser", data)
    .then((response) => {
      const { data: res } = response;
      return res;
    })
    .catch((err) => {
      return err;
    })
    .finally();
};
const UserService = {
  getAllOnlineUser,
  createUser
};
export default UserService;
