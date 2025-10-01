export abstract class RemoveChannelPort {
  abstract remove(id: string): Promise<string | undefined>;
}
