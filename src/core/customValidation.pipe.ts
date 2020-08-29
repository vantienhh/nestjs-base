import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { Type } from '@nestjs/common/interfaces/type.interface'
import { ValidationException } from 'src/exceptions/validation.exception'
import { ValidationError } from 'class-validator/types/validation/ValidationError'
import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common'

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

  private buildError(errors: ValidationError[], keyErrorParent?: string) {
    let result: { [key: string]: any } = {}
    errors.forEach((child: ValidationError) => {
      const keyError = keyErrorParent ? `${keyErrorParent}.${child.property}` : child.property

      if (child.constraints) {
        Object.entries(child.constraints).forEach(constraint => {
          result[keyError] = `${constraint[1]}`
        })
      }
      if (child.children) {
        result = { ...result, ...this.buildError(child.children, keyError) }
      }
    })

    return result
  }

  private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object]
    return !types.find(type => metatype === type)
  }
}
