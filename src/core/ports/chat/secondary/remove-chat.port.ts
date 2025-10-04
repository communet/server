export abstract class RemoveChatPort {
  abstract remove(id: string): Promise<string | undefined>;
}
