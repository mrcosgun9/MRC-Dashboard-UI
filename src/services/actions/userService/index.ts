"use server"
import prisma from '@/lib/prisma'
 import { IBaseDataResponse, IBaseDatasResponse, IBaseReponse } from "@/types/baseType";
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
const getFakeUserLastedChat = async (): Promise<IBaseDataResponse<CreateUserResponse>> => {
  return await httpClient
    .post<IBaseDataResponse<CreateUserResponse>>("User/GetFakeUserLastedChat", {})
    .then((response) => {
      const { data: res } = response;
      return res;
    })
    .catch((err) => {
      return err;
    })
    .finally();
};
const deleteUser = async (data: {id:number}): Promise<IBaseReponse> => {
  return await httpClient
    .post<IBaseReponse>(
      "User/DeleteUser",
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



export type UserWithProfile ={
  Id: number
  Name: string
  LastName: string
  Email: string
  CreatedAt: Date
  UpdatedAt: Date | null
  IsDeleted: boolean
  IsActive: boolean
  UserName: string
  FullName: string
  PhoneNumber: string | null
  Coin: number | null
  UserImages?: {
    Id: number
    ImageUrl: string
    CreatedAt: Date
    UpdatedAt: Date | null
  }[] | null // Optional field for user images
}


const fetchUserList = async (): Promise<UserWithProfile[]> => {
  try {
    const users = await prisma.user.findMany({
      where: {
        IsDeleted: false, // Fetch only non-deleted users
      },
      select: {
        Id: true,
        Name: true,
        LastName: true,
        Email: true,
        CreatedAt: true,
        UpdatedAt: true,
        IsDeleted: true,
        IsActive: true,
        UserName: true,
        FullName: true,
        PhoneNumber: true,
        Coin: true,
        UserImages: {
          select: {
            Id: true,
            ImageUrl: true,
            CreatedAt: true,
            UpdatedAt: true,
          },
        },
      },
      orderBy: {
        CreatedAt: 'desc',
      }
    });
    return users;
  } catch (error) {
    console.error('Error fetching user list:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const fetchUserById = async (userId: number | undefined): Promise<UserWithProfile | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      },
      select: {
        Id: true,
        Name: true,
        LastName: true,
        Email: true,
        CreatedAt: true,
        UpdatedAt: true,
        IsDeleted: true,
        IsActive: true,
        UserName: true,
        FullName: true,
        PhoneNumber: true,
        Coin: true,
        UserImages: {
          select: {
            Id: true,
            ImageUrl: true,
            CreatedAt: true,
            UpdatedAt: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
const UserService = {
  getAllOnlineUser,
  createUser,
  getFakeUserLastedChat,
  deleteUser,

  fetchUserById,
  fetchUserList
};
export default UserService;
