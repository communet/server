export type MessageEntityPayload = {
  id: string;
  content: string;
  senderId: string;
  chatId: string;
  createdAt?: Date;
};
