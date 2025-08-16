export class CreateChannelCommand {
  constructor(
    public readonly name: string,
    public readonly creatorId: string,
  ) {}
}
