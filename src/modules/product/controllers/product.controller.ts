import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { ProductService } from 'src/modules/product/services/product.service'
import { CreateProductDto } from 'src/modules/product/dto/products/CreateProduct.dto'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id')
  async show(@Param('id') id: string | number) {
    return this.productService.show(id)
  }

  @Post()
  async create(@Body() data: CreateProductDto) {
    return this.productService.create(data)
  }
}
