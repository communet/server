import { ResponseForbidden } from './types';

export class ForbiddenResponse {
  constructor(public name: string) {}
}

export const mapForbidden = ({
  name,
}: ForbiddenResponse): ResponseForbidden => ({
  error: true,
  reason: [name],
  code: 'forbidden',
});
