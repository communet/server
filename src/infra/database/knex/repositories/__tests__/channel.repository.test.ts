import { Knex } from 'knex';
import { v4 } from 'uuid';
import { ChannelEntity } from '../../../../../core/entities';
import { IdGeneratorAdapter } from '../../../../common';
import { db } from '../../db.instance';
import { ChannelRepository } from '../channel.repository';

const idGenerator = new IdGeneratorAdapter();

const setUp = async (): Promise<{
  transaction: Knex.Transaction;
  userId: string;
}> => {
  const transaction = await db.transaction();

  const [{ id: userId }] = await transaction('users')
    .insert({
      id: idGenerator.generate(),
      username: idGenerator.generate(),
    })
    .returning('id');

  return { transaction, userId };
};

describe('ChannelRepository', () => {
  afterAll(async () => {
    await db.destroy();
  });

  it('ChannelRepository.save returns saved channel', async () => {
    const { transaction, userId } = await setUp();

    const repository = new ChannelRepository(transaction);
    const channel = new ChannelEntity(
      idGenerator.generate(),
      'some channel name',
      userId,
    );

    const savedChannel = await repository.save(channel);

    await transaction.rollback();

    expect(savedChannel).toStrictEqual(channel);
  });

  it('ChannelRepository.loadById returns null if channel not found', async () => {
    const transaction = await db.transaction();
    const repository = new ChannelRepository(transaction);

    const result = await repository.loadById(v4());

    await transaction.rollback();

    expect(result).toBeNull();
  });

  it('ChannelRepository.loadById returns channel if found', async () => {
    const { transaction, userId } = await setUp();
    const repository = new ChannelRepository(transaction);
    const channel = new ChannelEntity(
      idGenerator.generate(),
      'some channel name',
      userId,
    );

    await repository.save(channel);

    const loadedChannel = await repository.loadById(channel.id);

    await transaction.rollback();

    expect(loadedChannel).toStrictEqual(channel);
  });

  it('ChannelRepository.remove removes channel and returns it id', async () => {
    const { transaction, userId } = await setUp();
    const repository = new ChannelRepository(transaction);
    const channel = new ChannelEntity(
      idGenerator.generate(),
      'some channel name',
      userId,
    );

    await repository.save(channel);

    const result = await repository.remove(channel.id);

    const loadedChannel = await repository.loadById(channel.id);

    await transaction.rollback();

    expect(result).toBe(channel.id);
    expect(loadedChannel).toBeNull();
  });

  it('ChannelRepository.loadByUserId returns channels', async () => {
    const { transaction, userId } = await setUp();
    const repository = new ChannelRepository(transaction);
    const channel = new ChannelEntity(
      idGenerator.generate(),
      'some channel name',
      userId,
    );
    const anotherChannel = new ChannelEntity(
      idGenerator.generate(),
      'some another channel name',
      userId,
    );

    await repository.save(channel);
    await repository.save(anotherChannel);

    const loadedChannels = await repository.loadByUserId(userId);

    await transaction.rollback();

    expect(loadedChannels).toStrictEqual([channel, anotherChannel]);
  });
});
