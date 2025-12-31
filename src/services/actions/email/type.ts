export interface SendMessageNotificationParams {
  recipientEmail: string;
  recipientName: string;
  senderFullName: string;
  messageContent: string;
  chatId: number;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}
