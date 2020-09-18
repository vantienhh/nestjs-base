import { Injectable } from '@nestjs/common'
import { AbstractMongooseRepository } from 'src/utils/database'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { City } from 'src/modules/location/city/city.schema'
import { ICityRepository } from 'src/modules/location/city/city.interface'

@Injectable()
export class CityRepository extends AbstractMongooseRepository<City> implements ICityRepository {
  constructor(@InjectModel(City.name) private cityModel: Model<City>) {
    super(cityModel)
  }
}
