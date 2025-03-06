import { RedisClientType, createClient } from 'redis';

export class RedisWrapper {
  private redis: RedisClientType;

  constructor(url: string) {
    this.redis = createClient({
      url,
    });
  }

  async connect(): Promise<void> {
    await this.redis.connect();
  }

  get connection(): RedisClientType {
    return this.redis;
  }
}
