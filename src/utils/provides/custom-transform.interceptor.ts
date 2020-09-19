import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { IResponse } from 'src/types'
import { AbstractResponseDto } from 'src/utils/dto'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'

@Injectable()
export class CustomTransformInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  private static getInterceptorData(data: any) {
    data = data?.results || data

    if (data instanceof AbstractResponseDto) {
      data = data.transform()
    } else if (Array.isArray(data) && data?.[0] instanceof AbstractResponseDto) {
      data = [...data].map(subData => subData.transform())
    }

    return data
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
    return next.handle().pipe(
      map(data => {
        const response: IResponse<any> = {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data?.message || 'Success',
          data: CustomTransformInterceptor.getInterceptorData(data)
        }

        return response
      })
    )
  }
}
