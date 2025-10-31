import { Knex } from 'knex';
import { v4 } from 'uuid';
import { MessageEntity } from '../../../../../core/entities';
import { IdGeneratorAdapter } from '../../../../common';
import { db } from '../../db.instance';
import { MessageRepository } from '../message.repository';

const idGenerator = new IdGeneratorAdapter();
const setUp = async (): Promise<{
  transaction: Knex.Transaction;
  chatId: string;
  userId: string;
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

  const [{ id: chatId }] = await transaction('chats')
    .insert({
      id: idGenerator.generate(),
      name: idGenerator.generate(),
      channel_id: channelId,
    })
    .returning('id');

  return { transaction, chatId, userId };
};

describe('MessageRepository', () => {
  afterAll(async () => {
    await db.destroy();
  });

  it('MessageRepository.save returns saved message', async () => {
    const { transaction, chatId, userId } = await setUp();

    const repository = new MessageRepository(transaction);
    const message = new MessageEntity({
      id: idGenerator.generate(),
      content: 'some content',
      senderId: userId,
      chatId,
      createdAt: new Date(),
    });

    const savedMessage = await repository.save(message);

    await transaction.rollback();

    expect(savedMessage).toStrictEqual(message);
  });

  it('MessageRepository.loadById returns null if message not found', async () => {
    const transaction = await db.transaction();
    const repository = new MessageRepository(transaction);

    const result = await repository.load(v4());

    await transaction.rollback();

    expect(result).toBeNull();
  });

  it('MessageRepository.loadById returns message if found', async () => {
    const { transaction, chatId, userId } = await setUp();
    const repository = new MessageRepository(transaction);

    const message = await repository.save(
      new MessageEntity({
        id: idGenerator.generate(),
        content: 'some content',
        senderId: userId,
        chatId,
        createdAt: new Date(),
      }),
    );

    const result = await repository.load(message.id);

    await transaction.rollback();

    expect(result).toStrictEqual(message);
  });

  it('MessageRepository.loadByChatId returns messages for chat', async () => {
    const { transaction, chatId, userId } = await setUp();
    const repository = new MessageRepository(transaction);

    const message1 = await repository.save(
      new MessageEntity({
        id: idGenerator.generate(),
        content: 'some content 1',
        senderId: userId,
        chatId,
        createdAt: new Date(Date.now() - 1000),
      }),
    );

    const message2 = await repository.save(
      new MessageEntity({
        id: idGenerator.generate(),
        content: 'some content 2',
        senderId: userId,
        chatId,
        createdAt: new Date(),
      }),
    );

    const result = await repository.loadByChatId(chatId);

    await transaction.rollback();

    expect(result).toStrictEqual([message1, message2]);
  });

  it('MessageRepository.remove removes message', async () => {
    const { transaction, chatId, userId } = await setUp();
    const repository = new MessageRepository(transaction);

    const message = await repository.save(
      new MessageEntity({
        id: idGenerator.generate(),
        content: 'some content',
        senderId: userId,
        chatId,
        createdAt: new Date(),
      }),
    );

    const result = await repository.remove(message.id);

    const loadedMessage = await repository.load(message.id);

    await transaction.rollback();

    expect(result).toBe(message.id);
    expect(loadedMessage).toBeNull();
  });
});
