export interface GetMessageByChatIdResponses {
  senderId: number
  sender: MessagesUser
  recipientUserId: number
  recipientUser: MessagesUser
  chatId: number
  chat: Chat
  content: string
  createdAt?: string
}

export interface Chat {
  id: number
  senderUserId: number
  senderUser: MessagesUser
  recipientUserId: number
  recipientUser: MessagesUser
}

export interface MessagesUser {
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
