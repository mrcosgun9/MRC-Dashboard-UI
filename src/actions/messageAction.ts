import { Id } from 'react-toastify';
"use server"
import { Messages } from "@prisma/client";
import prisma from '@/lib/prisma'
import { GetChatByIdResponse } from "@/services/actions/chat/type";

export const createMessages = async ({ data }: { data: Omit<Messages, 'Id'> }) => {
  console.log(data);

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