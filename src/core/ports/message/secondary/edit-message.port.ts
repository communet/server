export abstract class EditMessagePort {
  abstract edit(id: string, message: string): Promise<void>;
}
