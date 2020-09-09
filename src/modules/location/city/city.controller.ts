import { plainToClass } from 'class-transformer'
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { CityService } from 'src/modules/location/city/city.service'
import { IdCityDto, CityResponseDto, CreateCityDto } from 'src/modules/location/city/dto'

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async index() {
    return this.cityService.hello()
  }

  @Get('/:id')
  async show(@Param() param: IdCityDto) {
    const { id } = param
    const result = await this.cityService.show(id)

    return plainToClass(CityResponseDto, result)
  }

  @Post()
  async create(@Body() data: CreateCityDto): Promise<CityResponseDto> {
    const result = await this.cityService.create(data)

    return plainToClass(CityResponseDto, result)
  }

  @Delete('/:id')
  async delete(@Param() param: IdCityDto): Promise<[]> {
    const { id } = param
    await this.cityService.delete(id)
    return []
  }
}
