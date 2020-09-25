import { DistrictSave } from 'src/modules/location/district/district.interface';
import { MinLength, MaxLength, IsBoolean, IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { IsExists } from 'src/utils/validations';

export class CreateDistrictDto implements DistrictSave {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  @IsExists('cities', '_id')
  city_id: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
