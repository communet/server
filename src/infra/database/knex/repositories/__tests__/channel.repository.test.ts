import { v4 } from 'uuid';
import { ChannelEntity } from '../../../../../core/entities';
import { FixedIdGenerator } from '../../../../common';
import { db } from '../../db.instance';
import { ChannelRepository } from '../channel.repository';

const idGenerator = new FixedIdGenerator(v4());

describe('ChannelRepository', () => {
  beforeAll(async () => {
    await db.migrate.up();
    await db('users').insert({
      id: idGenerator.generate(),
      username: idGenerator.generate(),
    });
  });

  afterAll(async () => {
    await db('channels').where({ id: idGenerator.generate() }).del();
    await db('users').where({ username: idGenerator.generate() }).del();
    await db.destroy();
  });

  it('ChannelRepository can be created', () => {
    const respository = new ChannelRepository(db);

    expect(respository).toBeDefined();
    expect(db).toBeDefined();
  });

  it('ChannelRepository.save returns saved channel', async () => {
    const repository = new ChannelRepository(db);
    const channel = new ChannelEntity(
      idGenerator.generate(),
      'some channel name',
      idGenerator.generate(),
    );

    const savedChannel = await repository.save(channel);

    expect(savedChannel).toStrictEqual(channel);
  });

  it('ChannelRepository.loadById returns null if channel not found', () => {
    const repository = new ChannelRepository(db);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(repository.loadById(v4())).resolves.toBeNull();
  });

  it('ChannelRepository.loadById returns channel if found', async () => {
    const repository = new ChannelRepository(db);
    const channel = new ChannelEntity(
      idGenerator.generate(),
      'some channel name',
      idGenerator.generate(),
    );

    await repository.save(channel);

    const loadedChannel = await repository.loadById(channel.id);

    expect(loadedChannel).toStrictEqual(channel);
  });

  it('ChannelRepository.remove removes channel', async () => {
    const repository = new ChannelRepository(db);
    const channel = new ChannelEntity(
      idGenerator.generate(),
      'some channel name',
      idGenerator.generate(),
    );

    await repository.save(channel);

    await repository.remove(channel.id);

    const loadedChannel = await repository.loadById(channel.id);

    expect(loadedChannel).toBeNull();
  });
});
