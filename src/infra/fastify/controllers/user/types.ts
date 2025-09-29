import { ControllerHandlerParams } from '../../router';

export type GetUserByIdHandlerParams = ControllerHandlerParams<{
  Params: {
    id: string;
  };
}>;
