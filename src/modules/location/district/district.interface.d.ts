import { Document } from 'mongoose';
import { IAbstractMongooseRepository } from 'src/types';

export interface DistrictSave {
  code: string;
  name: string;
  city_id: string;
  active: boolean;
}

export interface DistrictResponse extends DistrictSave {
  id: string;
  active_text: string;
}

export interface IDistrict extends Document {
  code: string;
  name: string;
  city_id: string;
  active: boolean;
}

export type IDistrictRepository = IAbstractMongooseRepository<IDistrict>;
