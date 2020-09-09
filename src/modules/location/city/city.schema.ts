import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ICity } from 'src/modules/location/city/city.interface'

@Schema()
export class City extends Document implements ICity {
  @Prop({
    required: [true, 'Mã là bắt buộc'],
    trim: true,
    type: String,
    minlength: [2, 'Mã phải có ít nhất 2 ký tự']
  })
  code: string

  @Prop({
    required: [true, 'Tên thành phố là bắt buộc'],
    trim: true,
    type: String,
    minlength: [2, 'Tên thành phố phải có ít nhất 2 ký tự']
  })
  name: string

  @Prop({
    type: Boolean,
    default: true
  })
  active: boolean
}

export const CitySchema = SchemaFactory.createForClass(City)
