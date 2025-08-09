export class ChangeChannelNameCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}
}
