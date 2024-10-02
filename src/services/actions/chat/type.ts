export interface GetFakeUserChatListResponse {
  id: number
  senderUserId: number
  senderUser: User
  recipientUserId: number
  recipientUser: User
  chatNotes: ChatNote[]
}
export interface ChatNote {
  note: string
  userId: number
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
