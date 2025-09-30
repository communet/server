export type ResponseOk<T> = {
  error: false;
  data: T;
};

export type ResponseNotFound = {
  error: true;
  reason: string[];
  code: 'not_found';
};

export type ResponseUnauthorized = {
  error: true;
  reason: string[];
  code: 'unauthorized';
};

export type ResponseBadRequest = {
  error: true;
  reason: string[];
  code: 'bad_request';
};

export type ResponseInternalServer = {
  error: true;
  reason: string[];
  code: 'server_error';
};

// TODO: Детализировать этот тип в будущем
export type ResponseError =
  | ResponseNotFound
  | ResponseUnauthorized
  | ResponseBadRequest
  | {
      error: true;
      reason: string[];
      code: string;
    };

export type Response<T> = ResponseOk<T> | ResponseError;
