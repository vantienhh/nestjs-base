import { Logger, Injectable } from '@nestjs/common'
import { Logger as winstonLogger, createLogger, format } from 'winston'
import { TransformableInfo } from 'logform'
import * as DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, printf } = format

@Injectable()
export class WinstonLogger extends Logger {
  private readonly logger: winstonLogger

  constructor() {
    super()
    this.logger = createLogger({
      transports: WinstonLogger.getTransports()
    })
  }

  private static getTransports() {
    const formatLog = printf((message: TransformableInfo) => {
      return `${message.timestamp} ${message.message}`
    })

    return [
      new DailyRotateFile({
        filename: 'src/storage/logs/error.%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error',
        format: combine(timestamp(), formatLog)
      })
      // new transports.File({
      //   filename: 'logs/info.log',
      //   level: 'info'
      // })
    ]
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.log('error', message)
    // TO DO
    super.error(message, trace, context)
  }

  warn(message: string, context?: string): void {
    // TO DO
    super.warn(message, context)
  }

  log(message: string, context?: string): void {
    // TO DO
    super.log(message, context)
  }

  debug(message: string, context?: string): void {
    // TO DO
    super.debug(message, context)
  }

  verbose(message: string, context?: string): void {
    // TO DO
    super.verbose(message, context)
  }
}
