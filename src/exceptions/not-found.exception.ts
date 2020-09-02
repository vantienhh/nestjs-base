import { HttpException, HttpStatus } from '@nestjs/common'
import { IResponse } from 'src/types'

export class NotFoundException extends HttpException {
  constructor() {
    const response: IResponse<{ errors: any }> = {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Not Found',
      data: []
    }
    super(response, HttpStatus.NOT_FOUND)
  }
}
