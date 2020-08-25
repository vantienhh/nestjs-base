import { Module } from '@nestjs/common'
import { WinstonLogger } from 'src/shared/logger/winston-logger.service'

@Module({
  providers: [WinstonLogger],
  exports: [WinstonLogger]
})
export class LoggerModule {}
