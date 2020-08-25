import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { ScheduleModule } from '@nestjs/schedule'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { CustomExceptionFilter } from 'src/exceptions/customException.filter'
import { RedisModule } from 'src/shared/redis/redis.module'
import { LoggerModule } from 'src/shared/logger/logger.module'
import { LocationModule } from './modules/location/location.module'
import { TransformInterceptor } from 'src/core/transform.interceptor'
import { CustomValidationPipe } from 'src/core/customValidation.pipe'

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
      useClass: TransformInterceptor
    },
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe
    }
  ]
})
export class AppModule {}
