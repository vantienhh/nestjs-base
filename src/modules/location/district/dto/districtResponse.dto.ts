import { Expose, Exclude } from 'class-transformer'
import { AbstractResponseDto } from 'src/utils/dto'
import { DistrictResponse } from 'src/modules/location/district/district.interface'

@Exclude()
export class DistrictResponseDto extends AbstractResponseDto {
  @Expose() _id: string
  @Expose() code: string
  @Expose() name: string
  @Expose() city_id: string
  @Expose() active: boolean

  getActiveText(): string {
    return this.active ? 'Active' : 'Inactive'
  }

  transform(): DistrictResponse {
    return {
      id: this._id,
      code: this.code,
      name: this.name,
      city_id: this.city_id,
      active: this.active,
      active_text: this.getActiveText()
    }
  }
}
