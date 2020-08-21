import { Injectable } from '@nestjs/common'
import { CreateCityDto } from 'src/modules/location/dto/cities/createCity.dto'
import { CityRepository } from 'src/modules/location/Repository/city.repository'
import { City } from 'src/modules/location/interfaces/city.interface'

@Injectable()
export class CityService {
  constructor(private readonly cityRepository: CityRepository) {
  }

  hello(): string {
    return 'hello'
  }

  create(data: CreateCityDto): Promise<City> {
    return this.cityRepository.create(data)
  }
}
