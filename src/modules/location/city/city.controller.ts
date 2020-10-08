import { Controller, Get } from '@nestjs/common';
import { CityService } from 'src/modules/location/city/city.service';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async index() {
    return this.cityService.hello();
  }
}
