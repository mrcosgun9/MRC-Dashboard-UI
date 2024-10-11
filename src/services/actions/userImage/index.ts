 
 
import { IBaseDatasResponse } from "@/types/baseType";
import { GetUserImagesResponse } from "./type";
import { httpClient } from "@/services/httpClient";

const getUserImages = async (
   
): Promise<IBaseDatasResponse<GetUserImagesResponse>> => {
  return await httpClient
    .post<IBaseDatasResponse<GetUserImagesResponse>>("UserImage/GetUserImages", {})
    .then((response) => {
      const { data: res } = response;
      return res;
    })
    .catch((err) => {
      return err;
    })
    .finally();
};
const addUserImage = async (
  formData: FormData
): Promise<IBaseDatasResponse<GetUserImagesResponse>> => {
  return await httpClient
    .post<IBaseDatasResponse<GetUserImagesResponse>>(
      "UserImage/AddUserImage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
const createUserImage = async (
  formData: FormData
): Promise<IBaseDatasResponse<GetUserImagesResponse>> => {
  return await httpClient
    .post<IBaseDatasResponse<GetUserImagesResponse>>(
      "UserImage/CreateUserImage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
const UserImages = {
  getUserImages ,
  addUserImage,
  createUserImage
};
export default UserImages;
