import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { ScheduleModule } from '@nestjs/schedule'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { CustomExceptionFilter } from 'src/utils/custom-exception.filter'
import { RedisModule } from 'src/modules/redis/redis.module'
import { LoggerModule } from 'src/modules/logger/logger.module'
import { LocationModule } from './modules/location/location.module'
import { TransformInterceptor } from 'src/utils/transform.interceptor'
import { CustomValidationPipe } from 'src/utils/custom-validation.pipe'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModule } from 'src/modules/product/product.module'

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
    ScheduleModule.forRoot(), // https://docs.nestjs.com/techniques/task-scheduling
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/test_nodejs'),
    RedisModule,
    LoggerModule,
    LocationModule,
    ProductModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe
    }
  ]
})
export class AppModule {}
