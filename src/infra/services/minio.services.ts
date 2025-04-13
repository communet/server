import { v4 as uuid4 } from 'uuid';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export abstract class IFileService {
  abstract uploadFile(
    bucketName: string,
    fileName: string,
    buffer: Buffer,
  ): Promise<string | null>;
}

export class FileService extends IFileService {
  constructor(protected readonly s3Client: S3Client) {
    super();
  }

  async uploadFile(
    bucketName: string,
    fileName: string,
    buffer: Buffer,
  ): Promise<string | null> {
    try {
      const newFileName = this.changeFileName(fileName);
      if (!newFileName) {
        return null;
      }
      const uploadCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        Body: buffer,
      });
      await this.s3Client.send(uploadCommand);
      return newFileName;
    } catch {
      return null;
    }
  }

  protected changeFileName(fileName: string): string {
    if (!this.validateFileExtension(fileName)) {
      return '';
    }
    const lastDotIndex = fileName.lastIndexOf('.');
    const fileExtension =
      lastDotIndex !== -1 ? fileName.slice(lastDotIndex + 1) : '';
    const newFileName = fileExtension ? `${uuid4()}.${fileExtension}` : '';
    return newFileName;
  }

  protected validateFileExtension(fileName: string): boolean {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const lastDotIndex = fileName.lastIndexOf('.');
    const fileExtension =
      lastDotIndex !== -1 ? fileName.slice(lastDotIndex + 1) : '';
    return fileExtension && allowedExtensions.includes(fileExtension)
      ? true
      : false;
  }
}
