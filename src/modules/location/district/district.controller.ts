import { plainToClass } from 'class-transformer'
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { DistrictService } from 'src/modules/location/district/district.service'
import { DistrictResponseDto, CreateDistrictDto } from 'src/modules/location/district/dto'
import { MongoIdDto } from 'src/utils/dto'

@Controller('districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get('/:id')
  async show(@Param() param: MongoIdDto) {
    const { id } = param
    const result = await this.districtService.show(id)

    return plainToClass(DistrictResponseDto, result)
  }

  @Post()
  async create(@Body() data: CreateDistrictDto): Promise<DistrictResponseDto> {
    const result = await this.districtService.create(data)
    return plainToClass(DistrictResponseDto, result)
  }

  @Delete('/:id')
  async delete(@Param() param: MongoIdDto): Promise<[]> {
    const { id } = param
    await this.districtService.delete(id)
    return []
  }
}
