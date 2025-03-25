import { Credentials, Profile } from '@/domain/entities/user.entities';
import {
  DisplayName,
  Email,
  Password,
  Username,
} from '@/domain/values/user.values';
import { ProfileModel } from '@/infra/database/models/profile.model';
import { CredentialsModel } from '@/infra/database/models/credentials.model';

export function convertCredentialsModelToEntity(
  model: CredentialsModel,
): Credentials {
  const username = new Username(model.username);
  const email = new Email(model.email);
  const password = new Password(model.password);
  return new Credentials(
    username,
    email,
    password,
    model.created_at,
    model.updated_at,
    model.id,
  );
}

export function convertProfileModelToEntity(model: ProfileModel): Profile {
  const displayName = new DisplayName(model.display_username);
  return new Profile(
    displayName,
    convertCredentialsModelToEntity(model.credentials),
    model.avatar_url,
    model.created_at,
    model.updated_at,
    model.id,
  );
}
