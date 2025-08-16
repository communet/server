export type MessageEntityPayload = {
  id: string;
  body: string;
  senderId: string;
  chatId: string;
  createdAt?: Date;
};
