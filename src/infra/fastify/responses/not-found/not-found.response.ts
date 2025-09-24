import { ResponseNotFound } from '../types';

export class NotFoundResponse {
  constructor(public reason: string) {}
}

export const mapNotFound = ({
  reason,
}: NotFoundResponse): ResponseNotFound => ({
  error: true,
  reason,
  code: 'not_found',
});
