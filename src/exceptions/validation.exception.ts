import { HttpException, HttpStatus } from '@nestjs/common';
import { IResponse } from 'src/types';

export class ValidationException extends HttpException {
  constructor(errors: any) {
    const response: IResponse<{ errors: any }> = {
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Input data validation failed',
      data: {
        errors: errors
      }
    };
    super(response, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
