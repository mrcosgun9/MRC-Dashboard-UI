import { ChatNote, Messages } from "@prisma/client"
import { CreateChatNoteResponse } from "../chatNote/type"

export interface GetFakeUserChatListResponse {
  id: number
  senderUserId: number
  senderUser: User
  recipientUserId: number
  recipientUser: User
  chatNotes: CreateChatNoteResponse[]
  createdAt: string
}
export interface User {
  id: number
  userName: string
  fullName: string
  email: string
  userType: number
  gender: number
  dateOfBirth: string
  dateOfBirthTime: string
  placeOfBirth: string
  maritalStatus: number
  numberOfChildren: number
  profileImage: string
  birthDay: string
  birthMonth: string
  birthYear: string
  about: string
  sexualOrientation: number
  name: string
  lastName: string
  phoneNumber: string
  isVerify: boolean
  isSmoke: boolean
  ethnicity: string
  bodyType: string
}
export interface GetFakeUserLastedChatResponse {
  id?: number
}


export type ChatData = {
  Id: number;
  SenderUserId: number;
  RecipientUserId: number;
  Messages: ChatMessageItem[]; // Messages tipi Prisma modelinize göre değişir
  ChatNote: ChatNote[]; // ChatNote tipi Prisma modelinize göre değişir
  ModeratorId: number | null;
  Name: string | null;
  CreatedAt: Date;
};

export type ChatMessageItem = {
  Id: number;

  SenderId: number;
  RecipientUserId: number;
  ModeratorId: number | null;
  IsSeen: boolean;
  IsDeleted: boolean;
  UserId: number | null;
  CreatedAt: Date;
  IsActive: boolean;
  Timestamp: Date;
  Content: string;
  ChatId: number;
  UpdatedAt: Date | null;
  User_Messages_RecipientUserIdToUser: {
    Id: number;
    Name: string;
    LastName: string;
    FullName: string;
    UserName: string;
    ProfileImage: string | null;
  } | null
  User_Messages_SenderIdToUser: {
    Id: number;
    Name: string;
    LastName: string;
    FullName: string;
    UserName: string;
    ProfileImage: string | null;
  } | null
  User_Messages_ModeratorIdToUser: {
    Id: number;
    Name: string;
    LastName: string;
    FullName: string;
    UserName: string;
    ProfileImage: string | null;
  } | null
}

export type GetChatByIdResponse = {
  chat: ChatData;
  SenderUser: GetChatByIdUserResponse | null;
  RecipientUser: GetChatByIdUserResponse | null;
}
export type GetChatByIdUserResponse = {
  Id: number;
  Name: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  UserName: string;
  FullName: string;
  UserType: number;
  ProfileImage: string | null;
  Gender: number | null;
  BirthDay: string | null;
  BirthMonth: string | null;
  BirthYear: string | null;
  About: string | null;
  UserImages: {
    Id: number;
    ImageUrl: string;
  }[];
}