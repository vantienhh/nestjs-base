import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DistrictController } from 'src/modules/location/district/district.controller';
import { DistrictRepository } from 'src/modules/location/district/district.repository';
import { DistrictService } from 'src/modules/location/district/district.service';
import { District, DistrictSchema } from 'src/modules/location/district/district.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: District.name, schema: DistrictSchema }])],
  controllers: [DistrictController],
  providers: [DistrictRepository, DistrictService]
})
export class DistrictModule {}
