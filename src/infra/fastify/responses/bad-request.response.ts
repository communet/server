import { ResponseBadRequest } from './types';

export class BadRequestResponse {
  constructor(
    public readonly name: string,
    public readonly reasons: string[],
  ) {}
}

export const mapBadRequest = ({
  name,
  reasons,
}: BadRequestResponse): ResponseBadRequest => ({
  error: true,
  reason: [name, ...reasons],
  code: 'bad_request',
});
