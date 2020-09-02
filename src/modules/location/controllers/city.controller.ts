import { Controller, Get, Post, Body } from '@nestjs/common'
import { CityService } from 'src/modules/location/services/city.service'
import { plainToClass } from 'class-transformer'
import { CreateCityDto } from 'src/modules/location/dto/cities/createCity.dto'
import { CityResponseDto } from 'src/modules/location/dto/cities/cityResponse.dto'

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async index() {
    return this.cityService.hello()
  }

  @Post()
  async create(@Body() data: CreateCityDto): Promise<CityResponseDto> {
    const result = await this.cityService.create(data)

    return plainToClass(CityResponseDto, result)
  }
}
