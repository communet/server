import { UserEntity } from '../../../core/entities';
import { LoadUserByIdPort } from '../../../core/ports';
import { GetUserByIdService } from '../get-user-by-id.service';

class MetaMockedLoadUserByIdPort implements LoadUserByIdPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadById(id: string): Promise<UserEntity | null> {
    throw new Error('Method not implemented.');
  }
}

const laodByIdMock = jest
  .spyOn(MetaMockedLoadUserByIdPort.prototype, 'loadById')
  .mockImplementationOnce(() =>
    Promise.resolve(new UserEntity('id', 'username')),
  )
  .mockImplementationOnce(() => Promise.resolve(null));

describe('GetUserByIdService tests', () => {
  it('GetUserByIdService can be created by passing mock LoadUserByIdPort and return UserEntity or null', () => {
    const user = new UserEntity('id', 'username');
    const loadPort = new MetaMockedLoadUserByIdPort();

    const userService = new GetUserByIdService(loadPort);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(userService.getUserById('id')).resolves.toStrictEqual(user);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(userService.getUserById('id')).resolves.toBeNull();

    expect(laodByIdMock).toHaveBeenCalledTimes(2);
  });
});
