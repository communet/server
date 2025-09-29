import { ControllerHandlerParams } from '../../router';

export type CreateChannelHandlerParams = ControllerHandlerParams<{
  Body: {
    name: string;
  };
}>;
