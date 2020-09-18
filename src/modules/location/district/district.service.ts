import { Injectable } from '@nestjs/common'
import { District } from 'src/modules/location/district/district.schema'
import { DistrictRepository } from 'src/modules/location/district/district.repository'
import { CreateDistrictDto } from 'src/modules/location/district/dto'

@Injectable()
export class DistrictService {
  constructor(private readonly cityRepository: DistrictRepository) {}
  show(id: string): Promise<District> {
    // To do
    return this.cityRepository.findOrFail(id)
  }

  create(data: CreateDistrictDto): Promise<District> {
    // To Do
    return this.cityRepository.create(data)
  }

  delete(id: string): Promise<boolean> {
    // To do
    return this.cityRepository.destroy(id)
  }
}
