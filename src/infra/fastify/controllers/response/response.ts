import { ResponseNotFound, ResponseOk } from './types';

export const createOkResponse = <T>(value: T): ResponseOk<T> => {
  return {
    error: false,
    data: value,
  };
};

export const createNotFoundResponse = (reason: string): ResponseNotFound => {
  return {
    error: true,
    reason,
    code: 'not_found',
  };
};
