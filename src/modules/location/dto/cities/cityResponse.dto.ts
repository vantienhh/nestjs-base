import { Expose, Exclude } from 'class-transformer'
import { AbstractResponseDto } from 'src/utils/abstract-response.dto'
import { CityResponse } from 'src/modules/location/interfaces/city.interface'

@Exclude()
export class CityResponseDto extends AbstractResponseDto {
  @Expose() id: string
  @Expose() code: string
  @Expose() name: string
  @Expose() active: boolean

  getActiveText(): string {
    return this.active ? 'Active' : 'Inactive'
  }

  transform(): CityResponse {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      active: this.active,
      active_text: this.getActiveText()
    }
  }
}
