export class ChangeChatNameCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}
}
