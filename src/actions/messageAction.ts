"use server"
import { ChatNote, Messages, UserChatInformation } from "@prisma/client";
import prisma from '@/lib/prisma'
import { GetChatByIdResponse } from "@/services/actions/chat/type";
import { IBaseDataResponse, IBaseDatasResponse, ResponseStatus } from "@/types/baseType";

export const createMessages = async ({ data }: { data: Omit<Messages, 'Id'> }) => {
  const res = await prisma.messages.create({
    data: data
  })
  return res;
}

export const getChatById = async (chatId: number): Promise<GetChatByIdResponse> => {
  const chat = await prisma.chats.findUnique({
    where: {
      Id: Number(chatId),
    },
    select: {
      Id: true,
      SenderUserId: true,
      RecipientUserId: true,
      UserChatInformation: true,
      Messages: {
        include: {
          User_Messages_RecipientUserIdToUser: {
            select: {
              Id: true,
              Name: true,
              LastName: true,
              FullName: true,
              UserName: true,
              ProfileImage: true,
            }
          },
          User_Messages_SenderIdToUser: {
            select: {
              Id: true,
              Name: true,
              LastName: true,
              FullName: true,
              UserName: true,
              ProfileImage: true,
            }
          },
          User_Messages_ModeratorIdToUser: {
            select: {
              Id: true,
              Name: true,
              LastName: true,
              FullName: true,
              UserName: true,
              ProfileImage: true,
            }
          }
        },
      },
      ChatNote: true,
      ModeratorId: true,
      Name: true,
      CreatedAt: true,

    },
  });
  const SenderUser = await prisma.user.findUnique({
    where: {
      Id: chat?.SenderUserId,
    },
    select: {
      Id: true,
      Name: true,
      LastName: true,
      Email: true,
      PhoneNumber: true,
      FullName: true,
      UserName: true,
      UserType: true,
      ProfileImage: true,
      BirthYear: true,
      BirthMonth: true,
      BirthDay: true,
      Gender: true,
      About: true,
      UserImages: {
        select: {
          Id: true,
          ImageUrl: true,
        },
      }
    },
  });
  const RecipientUser = await prisma.user.findUnique({
    where: {
      Id: chat?.RecipientUserId,
    },
    select: {
      Id: true,
      Name: true,
      LastName: true,
      UserType: true,
      Email: true,
      PhoneNumber: true,
      UserName: true,
      FullName: true,
      BirthYear: true,
      BirthMonth: true,
      BirthDay: true,
      Gender: true,
      ProfileImage: true,
      About: true,
      UserImages: {
        select: {
          Id: true,
          ImageUrl: true,
        },
      }
    },
  });

  if (!chat) {
    throw new Error(`Chat with ID ${chatId} not found.`);
  }
  return {
    chat: chat,
    SenderUser: SenderUser,
    RecipientUser: RecipientUser
  };

};

export const DeleteChatNote = async (noteId: number): Promise<IBaseDataResponse<ChatNote>> => {
  const res = await prisma.chatNote.delete({
    where: {
      Id: noteId
    }
  })
  return {
    data: res,
    message: "Chat note deleted successfully",
    status: ResponseStatus.Ok
  };
}

export const CreateChatNote = async (data: ChatNote):Promise<IBaseDataResponse<ChatNote>> => {
  data.CreatedAt = new Date();
  data.UpdatedAt = new Date();
  data.IsActive = true;
  data.IsDeleted = false;
  console.log("data", data);
  const res = await prisma.chatNote.create({
    data: data
  })
  return {
    data: res,
    message: "Chat note created successfully",
    status: ResponseStatus.Ok
  };
}

export const getLastedChat = async () => {
  const lastMessages = await prisma.messages.findMany({
    distinct: ['ChatId'],
    orderBy: { CreatedAt: 'desc' },
  });
  console.log("lastMessages", lastMessages);
  const unanswered = lastMessages.filter(m =>
    m.ModeratorId === null
  );
  return unanswered[0]?.ChatId;
}

export const UpsertUserChatInformation = async (data: UserChatInformation) => {

  const res = await prisma.userChatInformation.upsert({
    where: {
      Id: data.Id
    },
    update: {
      ...data
    },
    create: {
      ...data
    }
  })
  return res;
}
