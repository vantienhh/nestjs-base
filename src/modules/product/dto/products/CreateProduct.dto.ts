import { IsNotEmpty, IsString, MinLength, IsNumber, Min } from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number
}
