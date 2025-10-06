export class SendMessageCommand {
  constructor(
    public readonly content: string,
    public readonly senderId: string,
    public readonly chatId: string,
  ) {}
}
