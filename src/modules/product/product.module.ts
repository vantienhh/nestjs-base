import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductSchema, Product } from 'src/modules/product/schemas/product.schema'
import { ProductService } from 'src/modules/product/services/product.service'
import { ProductController } from 'src/modules/product/controllers/product.controller'
import { ProductRepository } from 'src/modules/product/repositories/product.repository'

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService]
})
export class ProductModule {}
