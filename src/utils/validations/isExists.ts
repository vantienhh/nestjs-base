import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint
} from 'class-validator';
import { Types, Collection, connections } from 'mongoose';
import { mongooseConnect } from 'src/utils/database';

/**
 * The field under validation must exist on a given database table
 *
 * @param {string} table
 * @param {string} column
 * @param {ValidationOptions} validationOptions
 * @returns {(object: Record<any, any>, propertyName: string) => void}
 */
export function isExists(table: string, column: string, validationOptions?: ValidationOptions) {
  return function (object: Record<any, any>, propertyName: string) {
    registerDecorator({
      name: 'isExists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table, column],
      options: validationOptions,
      validator: ValidateExists
    });
  };
}

@ValidatorConstraint()
class ValidateExists implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [table, column] = args.constraints;
    let collection: Collection | null = null;

    if (column === '_id') value = Types.ObjectId(value);

    for (const connection of connections) {
      const subConnection = connection.collection(table);
      // @ts-ignore
      if (subConnection.collection) {
        collection = subConnection;
        break;
      }
    }

    if (!collection) {
      const db = await mongooseConnect();
      collection = db.connection.collection(table);
    }
    return !!(await collection.findOne({ [column]: value }));
  }

  defaultMessage(): string {
    return 'value not exists in database';
  }
}
