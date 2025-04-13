import mime from 'mime-types';
import { v4 as uuid4 } from 'uuid';
import { Client } from 'minio';

export abstract class IFileService {
  abstract uploadFile(
    bucketName: string,
    fileName: string,
    buffer: Buffer,
  ): Promise<string>;
}

export class FileService extends IFileService {
  constructor(protected readonly minioClient: Client) {
    super();
  }

  async uploadFile(
    bucketName: string,
    fileName: string,
    buffer: Buffer,
  ): Promise<string> {
    try {
      const defaultContentType = 'application/octet-stream';
      const contentType = mime.lookup(fileName) || defaultContentType;
      const newFileName = this.changeFileName(fileName);
      await this.minioClient.putObject(
        bucketName,
        newFileName,
        buffer,
        buffer.length,
        { 'Content-Type': contentType },
      );
      return newFileName;
    } catch {
      return fileName;
    }
  }

  changeFileName(oldFileName: string): string {
    const lastDotIndex = oldFileName.lastIndexOf('.');
    const fileExtension =
      lastDotIndex !== -1 ? oldFileName.slice(lastDotIndex + 1) : '';
    const newAvatarName = fileExtension
      ? `${uuid4()}.${fileExtension}`
      : String(uuid4());

    return newAvatarName;
  }
}
