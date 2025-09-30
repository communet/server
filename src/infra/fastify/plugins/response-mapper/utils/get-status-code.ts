import { Response } from '../../../responses';
import {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  SUCCESS_CODE,
  UNAUTHORIZED_CODE,
} from '../constants';

export const getStatusCode = <T>(value: Response<T>): number => {
  console.log('value', { value });
  if (!value.error) {
    return SUCCESS_CODE;
  }

  switch (value.code) {
    case 'not_found':
      return NOT_FOUND_CODE;
    case 'unauthorized':
      return UNAUTHORIZED_CODE;
    case 'bad_request':
      return BAD_REQUEST_CODE;
    default:
      return SERVER_ERROR_CODE;
  }
};
