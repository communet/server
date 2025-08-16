export class SendMessageCommand {
  constructor(
    public readonly body: string,
    public readonly chatId: string,
  ) {}
}
