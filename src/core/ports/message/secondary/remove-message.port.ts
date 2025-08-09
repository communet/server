export abstract class RemoveMessagePort {
  abstract remove(id: string): Promise<void>;
}
