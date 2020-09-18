import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { RedisModule } from 'src/modules/redis/redis.module'
import { LoggerModule } from 'src/modules/logger/logger.module'
import { LocationModule } from './modules/location/location.module'
import { CustomTransformInterceptor, CustomValidationPipe, CustomExceptionFilter } from 'src/utils/core'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    // https://docs.nestjs.com/techniques/queues
    BullModule.registerQueue({
      name: 'base-nestjs-queue',
      redis: {
        host: 'localhost',
        port: 6379
      }
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/test_nodejs'),
    RedisModule,
    LoggerModule,
    LocationModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomTransformInterceptor
    },
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe
    }
  ]
})
export class AppModule {}
