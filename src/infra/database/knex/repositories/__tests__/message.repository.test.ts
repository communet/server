import { v4 } from 'uuid';
import { MessageEntity } from '../../../../../core/entities';
import { FixedIdGenerator } from '../../../../common';
import { db } from '../../db.instance';
import { MessageRepository } from '../message.repository';

const idGenerator = new FixedIdGenerator(v4());
const anotherIdGenerator = new FixedIdGenerator(v4());

describe('MessageRepository', () => {
  beforeAll(async () => {
    await db.migrate.up();
    await db('users').insert({
      id: idGenerator.generate(),
      username: idGenerator.generate(),
    });
    await db('channels').insert({
      id: idGenerator.generate(),
      name: idGenerator.generate(),
      creator_id: idGenerator.generate(),
    });
    await db('chats').insert({
      id: idGenerator.generate(),
      name: idGenerator.generate(),
      channel_id: idGenerator.generate(),
    });
  });

  afterAll(async () => {
    await db('messages')
      .whereIn('id', [idGenerator.generate(), anotherIdGenerator.generate()])
      .del();
    await db('chats').where({ name: idGenerator.generate() }).del();
    await db('channels').where({ name: idGenerator.generate() }).del();
    await db('users').where({ username: idGenerator.generate() }).del();

    await db.destroy();
  });

  it('MessageRepository can be created', () => {
    const respository = new MessageRepository(db);

    expect(respository).toBeDefined();
  });

  it('MessageRepository.save returns saved message', async () => {
    const repository = new MessageRepository(db);
    const message = new MessageEntity({
      id: idGenerator.generate(),
      content: 'some message content',
      senderId: idGenerator.generate(),
      chatId: idGenerator.generate(),
    });

    const savedMessage = await repository.save(message);

    expect(savedMessage).toStrictEqual(message);
  });

  it('MessageRepository.loadByChatId returns messages', async () => {
    const repository = new MessageRepository(db);
    const message = new MessageEntity({
      id: idGenerator.generate(),
      content: 'some message content',
      senderId: idGenerator.generate(),
      chatId: idGenerator.generate(),
    });
    const anotherMessage = new MessageEntity({
      id: anotherIdGenerator.generate(),
      content: 'some another message content',
      senderId: idGenerator.generate(),
      chatId: idGenerator.generate(),
    });

    await repository.save(message);
    await repository.save(anotherMessage);

    const loadedMessages = await repository.loadByChatId(message.chatId);

    expect(loadedMessages).toHaveLength(2);
    expect(loadedMessages).toStrictEqual([message, anotherMessage]);
  });

  it('MessageRepository.remove removes message', async () => {
    const repository = new MessageRepository(db);
    const message = new MessageEntity({
      id: idGenerator.generate(),
      content: 'some message content',
      senderId: idGenerator.generate(),
      chatId: idGenerator.generate(),
    });

    await repository.save(message);

    await repository.remove(message.id);

    const loadedMessages = await repository.loadByChatId(message.chatId);

    // NOTE: because in previous test we're added another message
    expect(loadedMessages).toHaveLength(1);
  });

  it('MessageRepository.load returns message or null', async () => {
    const repository = new MessageRepository(db);

    const message = await repository.load(idGenerator.generate());
    const anotherMessage = await repository.load(anotherIdGenerator.generate());

    expect(message).toBeNull();
    expect(anotherMessage).not.toBeNull();
  });
});
