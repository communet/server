export class ChangeMessageCommand {
  constructor(
    public readonly id: string,
    public readonly body: string,
  ) {}
}
