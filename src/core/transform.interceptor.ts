import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { IResponse } from 'src/types'
import { AbstractResponseDto } from 'src/core/abstractResponse.dto'

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  private static getInterceptorData(data: any) {
    data = data.results ? data.results : data

    if (data instanceof AbstractResponseDto) {
      data = data.transform()
    } else if (Array.isArray(data) && data.length && data[0] instanceof AbstractResponseDto) {
      data = [...data].map(subData => subData.transform())
    }

    return data
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
    return next.handle().pipe(
      map(data => {
        const response: IResponse<any> = {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data.message ? data.message : 'Success',
          data: TransformInterceptor.getInterceptorData(data)
        }

        return response
      })
    )
  }
}
