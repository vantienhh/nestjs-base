import { Injectable } from '@nestjs/common';
import { createClient, RedisClient } from 'redis';
import { redisClientConfig } from 'src/utils/configs';
import { WinstonLogger } from 'src/modules/logger/winston-logger.service';

@Injectable()
export class RedisService {
  private readonly client: RedisClient;

  constructor(private readonly logger: WinstonLogger) {
    this.client = createClient(redisClientConfig());
    this.connectMessage();
  }

  getClient(): RedisClient {
    return this.client;
  }

  private connectMessage(): void {
    this.client.on('connect', () => {
      console.log('Redis client connected');
    });
    this.client.on('error', error => {
      this.logger.error(error);
    });
  }
}
