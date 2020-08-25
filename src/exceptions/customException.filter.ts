import { ExceptionFilter as CoreExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { WinstonLogger } from 'src/shared/logger/winston-logger.service'

@Catch()
export class CustomExceptionFilter implements CoreExceptionFilter {
  constructor(private logger: WinstonLogger) {}

  private static handlerResponse(response: Response, exception: HttpException | Error): void {
    let responseBody: any
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR

    if (exception instanceof HttpException) {
      responseBody = exception.getResponse()
      statusCode = exception.getStatus()
    } else {
      responseBody = {
        statusCode: statusCode,
        message: process.env.NODE_ENV === 'production' ? 'Internal server error' : exception.stack
      }
    }

    response.status(statusCode).json(responseBody)
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    // Handling error message and logging
    this.handleMessage(exception, request)

    // IResponse to client
    CustomExceptionFilter.handlerResponse(response, exception)
  }

  private handleMessage(exception: HttpException | Error, request: Request): void {
    let message = 'Internal Server Error'

    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse())
    } else {
      message = exception.stack ? exception.stack.toString() : message
    }

    this.logger.error(`${request.method}] ${request.url} --- ${message}`)
  }
}
