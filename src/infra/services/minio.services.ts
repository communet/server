import { v4 as uuid4 } from 'uuid';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export abstract class IFileService {
  abstract uploadFile(
    bucketName: string,
    fileName: string,
    buffer: Buffer,
  ): Promise<string>;
}

export class FileService extends IFileService {
  constructor(protected readonly s3Client: S3Client) {
    super();
  }

  async uploadFile(
    bucketName: string,
    fileName: string,
    buffer: Buffer,
  ): Promise<string> {
    try {
      const newFileName = this.changeFileName(fileName);
      const uploadCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        Body: buffer,
      });
      await this.s3Client.send(uploadCommand);
      return newFileName;
    } catch {
      return fileName;
    }
  }

  protected changeFileName(oldFileName: string): string {
    const lastDotIndex = oldFileName.lastIndexOf('.');
    const fileExtension =
      lastDotIndex !== -1 ? oldFileName.slice(lastDotIndex + 1) : '';
    const newAvatarName = fileExtension
      ? `${uuid4()}.${fileExtension}`
      : String(uuid4());

    return newAvatarName;
  }
}
