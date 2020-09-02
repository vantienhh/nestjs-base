import { RedisService } from 'src/modules/redis/redis.service'
import { RedisClient } from 'redis'
import { Injectable } from '@nestjs/common'
import { IAbstractRedis } from 'src/modules/redis/abstract-redis.interface'

@Injectable()
export abstract class AbstractRedis implements IAbstractRedis {
  protected constructor(protected readonly redisService: RedisService) {}

  protected clientRedis(): RedisClient {
    return this.redisService.getClient()
  }

  async hasKeyInRedis(key: string): Promise<boolean> {
    return this.clientRedis().get(key)
  }

  async get(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.clientRedis().get(key, (err, reply) => {
        if (err) reject(err)
        resolve(reply)
      })
    })
  }
}
