import { Module } from '@nestjs/common';
import { CityController } from 'src/modules/location/city/city.controller';
import { CityRepository } from 'src/modules/location/city/city.repository';
import { CityService } from 'src/modules/location/city/city.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from 'src/modules/location/city/city.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'City', schema: CitySchema }])],
  controllers: [CityController],
  providers: [CityRepository, CityService]
})
export class CityModule {}
