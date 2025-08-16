export abstract class DeleteChatUseCase {
  abstract delete(id: string): Promise<void>;
}
