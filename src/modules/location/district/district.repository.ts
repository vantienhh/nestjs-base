import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { District } from 'src/modules/location/district/district.schema';
import { IDistrictRepository } from 'src/modules/location/district/district.interface';
import { AbstractMongooseRepository } from 'src/utils/database';

@Injectable()
export class DistrictRepository extends AbstractMongooseRepository<District> implements IDistrictRepository {
  constructor(@InjectModel(District.name) private districtModel: Model<District>) {
    super(districtModel);
  }
}
