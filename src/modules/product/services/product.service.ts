import { Injectable } from '@nestjs/common'
import { Product } from 'src/modules/product/schemas/product.schema'
import { CreateProductDto } from 'src/modules/product/dto/products/CreateProduct.dto'
import { ProductRepository } from 'src/modules/product/repositories/product.repository'

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  show(id: string | number) {
    return this.productRepo.findOrFail(id)
  }

  create(data: CreateProductDto): Promise<Product> {
    // To Do
    return this.productRepo.create(data)
  }
}
