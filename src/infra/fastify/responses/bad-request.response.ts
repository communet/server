import { ResponseBadRequest } from './types';

export class BadRequestResponse {
  constructor(public readonly reasons: string[]) {}
}

export const mapBadRequest = ({
  reasons,
}: BadRequestResponse): ResponseBadRequest => ({
  error: true,
  reason: reasons,
  code: 'bad_request',
});
