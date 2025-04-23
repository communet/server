import { v4 as uuid4 } from 'uuid';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export abstract class IFileService {
  abstract uploadFile(bucketName: string, buffer: Buffer): Promise<string>;
}

export class FileService extends IFileService {
  constructor(protected readonly s3Client: S3Client) {
    super();
  }

  async uploadFile(bucketName: string, buffer: Buffer): Promise<string> {
    const newFileName = String(uuid4());
    const uploadCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: newFileName,
      Body: buffer,
    });
    await this.s3Client.send(uploadCommand);
    return newFileName;
  }
}
