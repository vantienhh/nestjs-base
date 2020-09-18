import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { IDistrict } from 'src/modules/location/district/district.interface'

@Schema()
export class District extends Document implements IDistrict {
  @Prop({
    required: [true, 'Mã là bắt buộc'],
    trim: true,
    type: String,
    minlength: [2, 'Mã phải có ít nhất 2 ký tự']
  })
  code: string

  @Prop({
    required: [true, 'Tên quận/huyện là bắt buộc'],
    trim: true,
    type: String,
    minlength: [2, 'Tên quận/huyện phải có ít nhất 2 ký tự']
  })
  name: string

  @Prop({
    required: [true, 'Id thành phố là bắt buộc'],
    trim: true,
    type: String
  })
  city_id: string

  @Prop({
    type: Boolean,
    default: true
  })
  active: boolean
}

export const DistrictSchema = SchemaFactory.createForClass(District)
