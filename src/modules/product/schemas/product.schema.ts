import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Product extends Document {
  @Prop({
    required: [true, 'Name là bắt buộc'],
    trim: true,
    type: String,
    minlength: [2, 'Name phải có ít nhất 2 ký tự']
  })
  name: string

  @Prop({
    required: true,
    type: Number,
    min: 0
  })
  price: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)
