import { IsNotEmpty, MinLength, MaxLength, IsBoolean } from 'class-validator'
import { CitySave } from 'src/modules/location/interfaces/city.interface'

export class CreateCityDto implements CitySave {
  @IsNotEmpty()
  code: string

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string

  @IsNotEmpty()
  @IsBoolean()
  active: boolean
}
