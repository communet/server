export type ResponseOk<T> = {
  error: false;
  data: T;
};

export type ResponseNotFound = {
  error: true;
  reason: string;
  code: 'not_found';
};

export type ResponseUnauthorized = {
  error: true;
  reason: string;
  code: 'unauthorized';
};

// TODO: Детализировать этот тип в будущем
export type ResponseError =
  | ResponseNotFound
  | ResponseUnauthorized
  | {
      error: true;
      reason: string;
      code: string;
    };

export type Response<T> = ResponseOk<T> | ResponseError;
