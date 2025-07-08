import { IdRule } from '../../rules';
import { Permission } from './permission.entity';

export const SYSTEM_PERMISSIONS = {
  CREATE_CHANNEL: new Permission(new IdRule('create_channel')),
  DELETE_CHANNEL: new Permission(new IdRule('delete_channel')),
  UPDATE_CHANNEL: new Permission(new IdRule('update_channel')),
  READ_CHANNEL: new Permission(new IdRule('read_channel')),
  UPDATE_PROFILE: new Permission(new IdRule('update_profile')),
};
