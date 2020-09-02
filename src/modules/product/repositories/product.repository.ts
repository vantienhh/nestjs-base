import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Product } from 'src/modules/product/schemas/product.schema'
import { Model } from 'mongoose'
import { AbstractMongooseRepository } from 'src/utils/abstract-mongoose.repository'

@Injectable()
export class ProductRepository extends AbstractMongooseRepository<Product> {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
    super(productModel)
  }
}
