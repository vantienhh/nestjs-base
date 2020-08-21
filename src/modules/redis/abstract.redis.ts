import { RedisService } from './redis.service'
import { RedisClient } from 'redis'
import { Injectable } from '@nestjs/common'
import { IAbstractRedis } from './abstractRedis.interface'

@Injectable()
export abstract class AbstractRedis implements IAbstractRedis {
  constructor(protected readonly redisService: RedisService) {}

  protected clientRedis(): RedisClient {
    return this.redisService.getClient()
  }

  async hasKeyInRedis(key: string): Promise<boolean> {
    const value = await this.getValue(key)
    return !!value
  }

  async getValue(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.clientRedis().get(key, (err, reply) => {
        if (err) reject(err)
        resolve(reply)
      })
    })
  }
}
