import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint
} from 'class-validator'
import { Types } from 'mongoose'
import { mongooseConnect } from 'src/utils/database'

/**
 * The field under validation must exist on a given database table
 *
 * @param {string} table
 * @param {string} column
 * @param {ValidationOptions} validationOptions
 * @returns {(object: Record<any, any>, propertyName: string) => void}
 */
export function IsExists(table: string, column: string, validationOptions?: ValidationOptions) {
  return function (object: Record<any, any>, propertyName: string) {
    registerDecorator({
      name: 'isExists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table, column],
      options: validationOptions,
      validator: ValidateExists
    })
  }
}

@ValidatorConstraint({ async: true })
export class ValidateExists implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [table, column] = args.constraints
    if (column === '_id') value = Types.ObjectId(value)

    const db = await mongooseConnect()
    return db.connection
      .collection(table)
      .findOne({ [column]: value })
      .then(data => !!data)
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'value not exists in database'
  }
}
