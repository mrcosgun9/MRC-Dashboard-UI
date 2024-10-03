export interface CreateChatNoteRequest {
  note: string
  userId: number
  chatId: number
}
export interface CreateChatNoteResponse {
  id:number
  note: string
  userId: number
  createdAt: string
}

export interface DeleteChatNoteRequest {
  id: number
}