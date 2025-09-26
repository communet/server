import { ResponseUnauthorized } from './types';

export class UnauthorizedResponse {
  constructor() {}
}

export const mapUnauthorized = (): ResponseUnauthorized => ({
  error: true,
  reason: '',
  code: 'unauthorized',
});
