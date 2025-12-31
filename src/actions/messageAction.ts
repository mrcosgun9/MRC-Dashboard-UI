"use server"
import { ChatNote, Messages, UserChatInformation } from "@prisma/client";
import prisma from '@/lib/prisma'
import { GetChatByIdResponse } from "@/services/actions/chat/type";
import { IBaseDataResponse, IBaseDatasResponse, ResponseStatus } from "@/types/baseType";
import { sendMessageNotification } from "@/services/actions/email";

export const createMessages = async ({ data }: { data: Omit<Messages, 'Id'> }) => {
  const res = await prisma.messages.create({
    data: data
  })

  // Mesaj oluşturulduktan sonra e-posta bildirimi gönder
  try {
    // Alıcı kullanıcının bilgilerini çek
    const recipientUser = await prisma.user.findUnique({
      where: {
        Id: data.RecipientUserId,
      },
      select: {
        Email: true,
        FullName: true,
        Name: true,
      },
    });

    // Gönderen kullanıcının bilgilerini çek
    const senderUser = await prisma.user.findUnique({
      where: {
        Id: data.SenderId,
      },
      select: {
        FullName: true,
      },
    });

    // Eğer her iki kullanıcı da bulunursa e-posta gönder
    if (recipientUser && senderUser && recipientUser.Email) {
      await sendMessageNotification({
        recipientEmail: recipientUser.Email,
        recipientName: recipientUser.FullName || recipientUser.Name,
        senderFullName: senderUser.FullName,
        messageContent: data.Content,
        chatId: data.ChatId,
      });
    }
  } catch (error) {
    // E-posta gönderimi başarısız olursa sadece logla, mesaj kaydı devam etsin
    console.error('E-posta bildirimi gönderilemedi:', error);
  }

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
        orderBy: {
          CreatedAt: 'asc'
        },
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

export const CreateChatNote = async (data: ChatNote): Promise<IBaseDataResponse<ChatNote>> => {
  data.CreatedAt = new Date();
  data.UpdatedAt = new Date();
  data.IsActive = true;
  data.IsDeleted = false;
  const res = await prisma.chatNote.create({
    data: data
  })
  return {
    data: res,
    message: "Chat note created successfully",
    status: ResponseStatus.Ok
  };
}

export const getLastedChat = async (id?:number) => {
  const lastMessages = await prisma.messages.findMany({
    distinct: ['ChatId'],
    orderBy: { CreatedAt: 'desc' },
    ...(id && {
      where: {
        ChatId: {
          not: id
        }
      }
    })
  });

  const unanswered = lastMessages.filter(m =>
    m.ModeratorId === null
  );
  return unanswered[0]?.ChatId;
}

export const UpsertUserChatInformation = async (data: UserChatInformation) => {
  if (!data.Id) {

    const res = await prisma.userChatInformation.create({
      data: {
        ...data
      }
    })
    return res;
  }
  const res = await prisma.userChatInformation.update({
    where: {
      Id: data.Id
    },
    data: {
      ...data
    }
  })
  return res;

}

export const getFakeUserChatList = async () => {
  const data = await prisma.chats.findMany({
    where: {
      IsActive: true,
      IsDeleted: false,

    },
    include:{
      User_Chats_RecipientUserIdToUser:true,
      User_Chats_SenderUserIdToUser:true
    }
  })
  return data;
}