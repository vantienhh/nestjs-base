import { config } from 'dotenv';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { WinstonLogger } from 'src/modules/logger/winston-logger.service';
import { Express } from 'express';

config();

export async function bootstrap(expressInstance: Express) {
  // Use express transform
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(expressInstance), {
    // httpsOptions: {},
    bodyParser: true,
    cors: {
      origin: 'https://example.com',
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      preflightContinue: false,
      optionsSuccessStatus: HttpStatus.OK
    }
  });

  app.use(helmet());

  // rate limit request
  app.use(
    rateLimit({
      max: 20, // limit each IP to 20 requests per windowMs
      windowMs: 60 * 1000, // 1 minutes
      message: {
        status: HttpStatus.TOO_MANY_REQUESTS,
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: 'Too Many Request from this IP, please try again in an hour'
      }
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  );

  const winston = new WinstonLogger();
  // log when PROMISE is rejected and no error handler is attached to the promise
  process.on('unhandledRejection', (reason, promise) => {
    promise.catch(e => winston.error(e.stack));
  });
  // log when warning
  process.on('warning', warning => {
    winston.warn(`${warning.name} -- ${warning.message} \n ${warning.stack}`);
  });

  await app.listen(3008);
  await app.init();
}
