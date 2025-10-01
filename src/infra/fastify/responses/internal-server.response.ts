import { ResponseInternalServer } from './types';

export class InternalServerResponse {
  constructor(public message: string) {}
}

export const mapInternalServer = ({
  message,
}: InternalServerResponse): ResponseInternalServer => ({
  error: true,
  reason: [message],
  code: 'server_error',
});
