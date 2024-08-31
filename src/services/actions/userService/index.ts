import { IBaseDatasResponse } from "@/types/baseType";
import { httpClient } from "@/services/httpClient";
import { GetAllOnlineUserResponse } from "./type";

const getAllOnlineUser = async (

): Promise<IBaseDatasResponse<GetAllOnlineUserResponse>> => {
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
const UserService = {
  getAllOnlineUser
};
export default UserService;
