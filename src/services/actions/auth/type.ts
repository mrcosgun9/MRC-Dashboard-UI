//Register Services Type
export type RegisterRequest = {
  email: string;
  userName: string;
  password: string;
  fullName: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: GenderType;
  sexualOrientation: SexualOrientation;
};
export enum GenderType {
  Unknown = 0, //Belirtmek İstemiyorum
  Male = 1,
  Woman = 2,
  Trans = 3,
  Other = 4,
}
export enum SexualOrientation {
  Male = 0,
  Women = 1,
}
export type RegisterResponse = {
  accessToken: string;
  expiration: string;
  refreshToken: string;
};

//Login Services Type
export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = {
  accessToken: string;
  expiration: string;
  refreshToken: string;
};
//Get Profile Info Services Type
export type GetProfileInfoResponse = {
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
  likedByUsers: LikedByUser[];
};
export type GetALLOnlineUserResponse = {
  id: number;
  userName: string;
  fullName: string;
  email: string;
  userType: number;
  gender: number;
  dateOfBirth: string;
  dateOfBirthTime: string;
  placeOfBirth: string;
  maritalStatus: number;
  numberOfChildren: number;
  profileImage: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  about: string;
  sexualOrientation: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  isVerify: boolean;
  isSmoke: boolean;
  ethnicity: string;
  bodyType: string;
  likedByUsers: LikedByUser[];
};

export interface LikedByUser {
  id: number;
  userId: number;
  likedUserId: number;
}
export type UpdateProfileRequest = {
  fullName: string;
  gender: number;
  dateOfBirth: string;
  dateOfBirthTime: string;
  placeOfBirth: string;
  maritalStatus: number;
  numberOfChildren: number;
  sexualOrientation: number;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  about: string;
  location: string;
  profileImage: string;
  isVerify: boolean;
  isSmoke: boolean;
  ethnicity: string;
  bodyType: string;
};


export type AuthenticationRequest = {
  email: string;
  password: string;
};
export type AuthenticationResponse  = {
  token: string;
  expiryDate: string;
};

export interface GetAuthenticationResponse {
  id: number
  name: string
  surname: string
  email: string
  createdOnUtc: string
  updatedOnUtc: string
  tenantIds: number[]
}
