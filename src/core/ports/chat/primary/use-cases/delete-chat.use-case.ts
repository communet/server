export abstract class DeleteChatCommand {
  abstract delete(id: string): Promise<void>;
}
