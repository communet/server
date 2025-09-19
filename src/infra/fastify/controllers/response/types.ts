export type ResponseOk<T> = {
  error: false;
  data: T;
};

export type ResponseNotFound = {
  error: true;
  reason: string;
  code: 'not_found';
};

// TODO: Детализировать этот тип в будущем
export type ResponseError = ResponseNotFound & {
  error: true;
  reason: string;
  code: string;
};

export type Response<T> = ResponseOk<T> | ResponseError;
