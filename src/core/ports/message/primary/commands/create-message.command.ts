export class CreateMessageCommand {
  constructor(
    public readonly body: string,
    public readonly chatId: string,
  ) {}
}
