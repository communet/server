export abstract class RemoveMessagePort {
  abstract remove(id: string): Promise<string | undefined>;
}
