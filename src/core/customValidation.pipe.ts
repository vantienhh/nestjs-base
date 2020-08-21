import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { ValidationError } from 'class-validator/types/validation/ValidationError'
import { ValidationException } from 'src/exceptions/validation.exception'

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) throw new BadRequestException('No data submitted')

    const { metatype } = metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    const object = plainToClass(metatype, value)
    const errors: ValidationError[] = await validate(object)

    if (errors.length > 0) throw new ValidationException(this.buildError(errors))
    return value
  }

  private buildError(errors: ValidationError[]) {
    const result: { [key: string]: any } = {}
    errors.forEach(el => {
      const prop = el.property
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.entries(el.constraints).forEach(constraint => {
        result[prop] = `${constraint[1]}`
      })
    })

    return result
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find(type => metatype === type)
  }
}
