import { Module } from '@nestjs/common';
import { RedisService } from 'src/modules/redis/redis.service';
import { LoggerModule } from 'src/modules/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule {}
