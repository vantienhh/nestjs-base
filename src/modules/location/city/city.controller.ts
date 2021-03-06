import { plainToClass } from 'class-transformer';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseInterceptors
} from '@nestjs/common';
import { CityService } from 'src/modules/location/city/city.service';
import { CityResponseDto, CreateCityDto } from 'src/modules/location/city/dto';
import { MongoIdDto } from 'src/utils/dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async index() {
    return this.cityService.hello();
  }

  @Get('/:id')
  async show(@Param() param: MongoIdDto) {
    const { id } = param;
    const result = await this.cityService.show(id);

    return plainToClass(CityResponseDto, result);
  }

  @Post('/test')
  @UseInterceptors(AnyFilesInterceptor())
  async create1(@Body() data: any) {
    console.log(data.test);
  }

  @Post()
  @HttpCode(200)
  async create(@Body() data: CreateCityDto): Promise<CityResponseDto> {
    const result = await this.cityService.create(data);

    return plainToClass(CityResponseDto, result);
  }

  @Delete('/:id')
  async delete(@Param() param: MongoIdDto): Promise<[]> {
    const { id } = param;
    await this.cityService.delete(id);
    return [];
  }
}
