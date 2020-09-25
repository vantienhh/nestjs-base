import { Logger, Injectable } from '@nestjs/common';
import { Logger as winstonLogger, createLogger, format } from 'winston';
import { TransformableInfo } from 'logform';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf } = format;

@Injectable()
export class WinstonLogger extends Logger {
  private readonly logger: winstonLogger;

  constructor() {
    super();
    this.logger = createLogger({
      transports: WinstonLogger.getTransports(),
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
      }
    });
  }

  private static getTransports() {
    const formatLog = printf((message: TransformableInfo) => {
      return `${message.timestamp}  [${message.level.toUpperCase()}] --- ${message.message}`;
    });

    return [
      new DailyRotateFile({
        filename: 'src/storage/logs/nestjs-base.%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'silly', // logger all level
        format: combine(timestamp(), formatLog)
      })
    ];
  }

  private static getMessage(message: any) {
    if (message instanceof Error) {
      return `${message.name} -- ${message.message} -- ${message.stack}`;
    }

    return message;
  }

  error(message: any, trace?: string, context?: string): void {
    this.logger.error(WinstonLogger.getMessage(message));
    super.error(message, trace, context);
  }

  warn(message: any, context?: string): void {
    this.logger.warn(WinstonLogger.getMessage(message));
    super.warn(message, context);
  }

  log(message: string, context?: string): void {
    super.log(message, context);
  }

  debug(message: string, context?: string): void {
    super.debug(message, context);
  }

  verbose(message: string, context?: string): void {
    super.verbose(message, context);
  }
}
