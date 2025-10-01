import { ControllerHandlerParams, WithParam } from '../../router';

export type GetUserByIdHandlerParams = WithParam<ControllerHandlerParams, 'id'>;
