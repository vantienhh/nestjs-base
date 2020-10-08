import { Module } from '@nestjs/common';
import { CityController } from 'src/modules/location/city/city.controller';
import { CityService } from 'src/modules/location/city/city.service';

@Module({
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule {}
