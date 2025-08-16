import { v4 } from 'uuid';
import { ChatEntity } from '../../../../../core/entities';
import { FixedIdGenerator } from '../../../../common';
import { db } from '../../db.instance';
import { ChatRepository } from '../chat.repository';

const idGenerator = new FixedIdGenerator(v4());
const anotherIdGenerator = new FixedIdGenerator(v4());
const anotherChatIdGenerator = new FixedIdGenerator(v4());

describe('ChatRepository', () => {
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
  });

  afterAll(async () => {
    await db('chats')
      .whereIn('id', [idGenerator.generate(), anotherIdGenerator.generate()])
      .del();
    await db('channels').where({ name: idGenerator.generate() }).del();
    await db('users').where({ username: idGenerator.generate() }).del();

    await db.destroy();
  });

  it('ChatRepository can be created', () => {
    const respository = new ChatRepository(db);

    expect(respository).toBeDefined();
  });

  it('ChatRepository.save returns saved chat', async () => {
    const repository = new ChatRepository(db);
    const chat = new ChatEntity(
      idGenerator.generate(),
      'some chat name',
      idGenerator.generate(),
    );

    const savedChat = await repository.save(chat);
    const loadedChats = await repository.loadByChannelId(chat.channelId);

    expect(savedChat).toStrictEqual(chat);
    expect(loadedChats).toHaveLength(1);
    expect(loadedChats).toStrictEqual([chat]);
  });

  it('ChatRepository.remove removes chat', async () => {
    const repository = new ChatRepository(db);
    await repository.remove(idGenerator.generate());

    const loadedChats = await repository.loadByChannelId(
      idGenerator.generate(),
    );

    expect(loadedChats).toHaveLength(0);
  });

  it('ChatRepository.loadByChannelId returns chats', async () => {
    const repository = new ChatRepository(db);
    const chat = new ChatEntity(
      idGenerator.generate(),
      'some chat name',
      idGenerator.generate(),
    );
    const anotherChat = new ChatEntity(
      anotherIdGenerator.generate(),
      'some another chat name',
      idGenerator.generate(),
    );

    await repository.save(chat);
    await repository.save(anotherChat);

    const loadedChats = await repository.loadByChannelId(chat.channelId);

    expect(loadedChats).toHaveLength(2);
    expect(loadedChats).toStrictEqual([chat, anotherChat]);
  });

  it('ChatRepository.load returns chat if found', async () => {
    const repository = new ChatRepository(db);
    const chat = new ChatEntity(
      idGenerator.generate(),
      'some chat name',
      idGenerator.generate(),
    );

    await repository.save(chat);

    const loadedChat = await repository.load(chat.id);
    const anotherChat = await repository.load(
      anotherChatIdGenerator.generate(),
    );

    expect(loadedChat).toStrictEqual(chat);
    expect(anotherChat).toBeNull();
  });
});
