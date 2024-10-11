export type GetAllOnlineUserResponse = {
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
  likedByUsers: LikedByUser[]
}

export type LikedByUser = {
  id: number
  userId: number
  likedUserId: number
}

export type CreateUserRequest = {
  email: string
  userName: string
  password: string
  fullName: string
  name: string
  lastName: string
  phoneNumber: string
  birthDay: string
  birthMonth: string
  birthYear: string
  userType: number
  gender: number
  maritalStatus: number
  sexualOrientation: number
  about: string
  isVerify: boolean
  isSmoke: boolean
  ethnicity: string
  bodyType: string
  job: string
}


export type CreateUserResponse={
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
