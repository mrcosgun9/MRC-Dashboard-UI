import { IBaseDatasResponse } from "@/types/baseType";
import { httpClient } from "@/services/httpClient";
import { GetMessageByChatIdResponses } from "./type";

const getMessagesByChatId = async ({chatId}:{chatId: number | undefined}): Promise<IBaseDatasResponse<GetMessageByChatIdResponses>> => {
  return await httpClient
    .post<IBaseDatasResponse<GetMessageByChatIdResponses>>(
      "Messages/GetMessageByChatId",
      {chatId:chatId}
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
const MessagesService = {
  getMessagesByChatId
};
export default MessagesService;
