import { ResponseInternalServer } from './types';

export class InternalServerResponse {
  constructor(public readonly message: string) {}
}

export const mapInternalServer = ({
  message,
}: InternalServerResponse): ResponseInternalServer => ({
  error: true,
  reason: [message],
  code: 'server_error',
});
