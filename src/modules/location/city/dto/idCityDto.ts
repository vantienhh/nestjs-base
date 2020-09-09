import { IsMongoId } from 'class-validator'

export class IdCityDto {
  @IsMongoId()
  id: string
}
