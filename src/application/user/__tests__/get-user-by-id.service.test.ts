import { UserEntity } from '../../../core/entities';
import { LoadUserByIdPort } from '../../../core/ports';
import { GetUserByIdService } from '../get-user-by-id.service';

const createLoadPort = (): jest.Mocked<LoadUserByIdPort> => {
  return {
    loadById: jest.fn(),
  };
};

describe('GetUserByIdService tests', () => {
  it('GetUserByIdService returns UserEntity if exists', () => {
    const loadPort = createLoadPort();

    const user = new UserEntity('id', 'username');
    loadPort.loadById.mockResolvedValue(user);

    const userService = new GetUserByIdService(loadPort);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(userService.getById('id')).resolves.toStrictEqual(user);
  });

  it('GetUserByIdService returns null if user does not exists', () => {
    const loadPort = createLoadPort();
    loadPort.loadById.mockResolvedValue(null);
    const userService = new GetUserByIdService(loadPort);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(userService.getById('id')).resolves.toBeNull();
  });
});
