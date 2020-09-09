import { Document } from 'mongoose'
import { IAbstractMongooseRepository } from 'src/types'

export interface CitySave {
  code: string
  name: string
  active: boolean
}

export interface CityResponse extends CitySave {
  id: string
  active_text: string
}

export interface ICity extends Document {
  code: string
  name: string
  active: boolean
}

export type ICityRepository = IAbstractMongooseRepository<ICity>
