import { IBaseDataResponse, IBaseDatasResponse } from "@/types/baseType";
import { httpClient } from "@/services/httpClient";
import { GetFakeUserChatListResponse, GetFakeUserLastedChatResponse } from "./type";

const getFakeUserChatList = async (): Promise<IBaseDatasResponse<GetFakeUserChatListResponse>> => {
  return await httpClient
    .post<IBaseDatasResponse<GetFakeUserChatListResponse>>(
      "Chat/GetFakeUserChatList",
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
const getUsersChatById = async ({ chatId }: { chatId: number | undefined }): Promise<IBaseDataResponse<GetFakeUserChatListResponse>> => {
  return await httpClient
    .post<IBaseDataResponse<GetFakeUserChatListResponse>>(
      "Chat/GetUsersChatById",
      { chatId: chatId }
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
const getFakeUserLastedChat = async ( ): Promise<IBaseDataResponse<GetFakeUserLastedChatResponse>> => {
  return await httpClient
    .post<IBaseDataResponse<GetFakeUserLastedChatResponse>>(
      "Chat/GetFakeUserLastedChat",
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
const ChatService = {
  getFakeUserChatList,
  getUsersChatById,
  getFakeUserLastedChat
};
export default ChatService;
