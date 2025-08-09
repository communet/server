export class CreateChatCommand {
  constructor(
    public readonly name: string,
    public readonly channelId: string,
  ) {}
}
