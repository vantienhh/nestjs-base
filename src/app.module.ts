import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggerModule } from 'src/modules/logger/logger.module';
import { LocationModule } from './modules/location/location.module';
import { CustomTransformInterceptor, CustomValidationPipe, CustomExceptionFilter } from 'src/utils/provides';

@Module({
  imports: [LoggerModule, LocationModule],
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
