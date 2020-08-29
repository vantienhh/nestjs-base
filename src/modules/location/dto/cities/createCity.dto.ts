import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsBoolean,
  IsString,
  ValidateNested,
  IsArray,
  IsObject
} from 'class-validator'
import { CitySave } from 'src/modules/location/interfaces/city.interface'
import { Type } from 'class-transformer'

class CreateTesttDto {
  @IsNotEmpty()
  code11: string
}

export class CreateCityDto implements CitySave {
  @IsNotEmpty()
  @IsString()
  code: string

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string

  @IsNotEmpty()
  @IsBoolean()
  active: boolean

  @IsObject()
  @ValidateNested({ message: 'Không đúng định dạng' })
  @Type(() => CreateTesttDto)
  test: CreateTesttDto

  @IsArray()
  @ValidateNested({ message: 'Không đúng định dạng' })
  @Type(() => CreateTesttDto)
  testArray: CreateTesttDto[]
}
