import { Response } from '../../../../responses';
import { NOT_FOUND_CODE, SERVER_ERROR_CODE, SUCCESS_CODE } from './constants';

export const getStatusCode = <T>(value: Response<T>): number => {
  if (!value.error) {
    return SUCCESS_CODE;
  }

  switch (value.code) {
    case 'not_found':
      return NOT_FOUND_CODE;
    default:
      return SERVER_ERROR_CODE;
  }
};
