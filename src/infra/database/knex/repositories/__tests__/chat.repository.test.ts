import { Knex } from 'knex';
import { v4 } from 'uuid';
import { ChatEntity } from '../../../../../core/entities';
import { IdGeneratorAdapter } from '../../../../common';
import { db } from '../../db.instance';
import { ChatRepository } from '../chat.repository';

const idGenerator = new IdGeneratorAdapter();

const setUp = async (): Promise<{
  transaction: Knex.Transaction;
  channelId: string;
}> => {
  const transaction = await db.transaction();
  const [{ id: userId }] = await transaction('users')
    .insert({
      id: idGenerator.generate(),
      username: idGenerator.generate(),
    })
    .returning('id');

  const [{ id: channelId }] = await transaction('channels')
    .insert({
      id: idGenerator.generate(),
      name: idGenerator.generate(),
      creator_id: userId,
    })
    .returning('id');

  return { transaction, channelId };
};

describe('ChatRepository', () => {
  afterAll(async () => {
    await db.destroy();
  });

  it('ChatRepository.save returns saved chat', async () => {
    const { transaction, channelId } = await setUp();

    const repository = new ChatRepository(transaction);
    const chat = new ChatEntity(
      idGenerator.generate(),
      'some chat name',
      channelId,
    );

    const savedChat = await repository.save(chat);

    await transaction.rollback();

    expect(savedChat).toStrictEqual(chat);
  });

  it('ChatRepository.loadById returns null if chat not found', async () => {
    const transaction = await db.transaction();
    const repository = new ChatRepository(transaction);

    const result = await repository.load(v4());

    await transaction.rollback();

    expect(result).toBeNull();
  });

  it('ChatRepository.loadById returns chat if found', async () => {
    const { transaction, channelId } = await setUp();
    const repository = new ChatRepository(transaction);
    const chat = new ChatEntity(
      idGenerator.generate(),
      'some chat name',
      channelId,
    );

    await repository.save(chat);

    const result = await repository.load(chat.id);

    await transaction.rollback();

    expect(result).toStrictEqual(chat);
  });

  it('ChatRepository.loadByChannelId returns chats', async () => {
    const { transaction, channelId } = await setUp();
    const repository = new ChatRepository(transaction);
    const chat = new ChatEntity(
      idGenerator.generate(),
      'some chat name',
      channelId,
    );
    const anotherChat = new ChatEntity(
      idGenerator.generate(),
      'some another chat name',
      channelId,
    );

    await repository.save(chat);
    await repository.save(anotherChat);

    const loadedChats = await repository.loadByChannelId(channelId);

    await transaction.rollback();

    expect(loadedChats).toEqual(expect.arrayContaining([chat, anotherChat]));
  });

  it('ChatRepository.remove removes chat and returns it id', async () => {
    const { transaction, channelId } = await setUp();
    const repository = new ChatRepository(transaction);
    const chat = new ChatEntity(
      idGenerator.generate(),
      'some chat name',
      channelId,
    );

    await repository.save(chat);

    const result = await repository.remove(chat.id);

    const loadedChat = await repository.load(chat.id);

    await transaction.rollback();

    expect(result).toBe(chat.id);
    expect(loadedChat).toBeNull();
  });
});
