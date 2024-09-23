//Register Services Type
export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
  surname: string;
};


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
  email: string
  password: string
  name: string
  surname: string
  tenantInfos: TenantInfo[]
}

export interface TenantInfo {
  id: number
  slug: string
  domain: string
  title: string
  aliasId: string
  connectionString: string
}

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
export type AuthenticationResponse = {
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
