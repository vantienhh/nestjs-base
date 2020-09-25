import { Injectable } from '@nestjs/common';
import { CityRepository } from 'src/modules/location/city/city.repository';
import { CreateCityDto } from 'src/modules/location/city/dto';
import { City } from 'src/modules/location/city/city.schema';

@Injectable()
export class CityService {
  constructor(private readonly cityRepository: CityRepository) {}

  hello(): string {
    return 'hello';
  }

  show(id: string): Promise<City> {
    // To do
    return this.cityRepository.findOrFail(id);
  }

  create(data: CreateCityDto): Promise<City> {
    // To Do
    return this.cityRepository.create(data);
  }

  delete(id: string): Promise<boolean> {
    // To do
    return this.cityRepository.destroy(id);
  }
}
