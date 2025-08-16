export class SendMessageCommand {
  constructor(
    public readonly body: string,
    public readonly senderId: string,
    public readonly chatId: string,
  ) {}
}
