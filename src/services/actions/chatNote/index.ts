import { IBaseDataResponse, IBaseReponse } from "@/types/baseType";
import { httpClient } from "@/services/httpClient";
import { CreateChatNoteRequest, CreateChatNoteResponse, DeleteChatNoteRequest } from "./type";


const createChatNote = async (data: CreateChatNoteRequest): Promise<IBaseDataResponse<CreateChatNoteResponse>> => {
  return await httpClient
    .post<IBaseDataResponse<CreateChatNoteResponse>>(
      "ChatNote/CreateChatNote",
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
const deleteChatNote = async (data: DeleteChatNoteRequest): Promise<IBaseReponse> => {
  return await httpClient
    .post<IBaseReponse>(
      "ChatNote/DeleteChatNote",
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
const ChatNoteService = {
  createChatNote,
  deleteChatNote
};
export default ChatNoteService;
