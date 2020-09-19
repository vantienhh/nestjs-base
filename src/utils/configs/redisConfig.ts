import { RedisOptions as ioRedisOptions } from 'ioredis'
import { RedisOptions } from 'src/types'
import { ClientOpts } from 'redis'

const redisConfig = (): RedisOptions => {
  let options: RedisOptions = {
    port: parseInt(process.env.REDIS_PORT || '6379'),
    host: process.env.REDIS_HOST || '127.0.0.1'
  }

  if (process.env.REDIS_PASSWORD) {
    options = { ...options, password: process.env.REDIS_PASSWORD }
  }

  return options
}

export const redisClientConfig = (): ClientOpts => {
  return redisConfig()
}

export const redisQueueConfig = (): ioRedisOptions => {
  return redisConfig()
}
