import { Id } from 'src/types'

export interface CitySave {
  code: string
  name: string
  active: boolean
}

export interface City extends CitySave, Id {}

export interface CityResponse extends City {
  active_text: string
}
