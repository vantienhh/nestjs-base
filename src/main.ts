import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { config } from 'dotenv'
import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit'
import { HttpStatus, ValidationPipe } from '@nestjs/common'

config()

async function bootstrap() {
  // Dùng express transform
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // Set security HTTP headers
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.use(helmet())

  // CORS
  app.enableCors()

  // rate limit request
  app.use(
    rateLimit({
      max: 20, // limit each IP to 20 requests per windowMs
      windowMs: 60 * 1000, // 1 minutes
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      message: {
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: 'Too Many Request from this IP, please try again in an hour'
      }
    })
  )

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  )

  await app.listen(process.env.PORT || 3000)
}

bootstrap()
