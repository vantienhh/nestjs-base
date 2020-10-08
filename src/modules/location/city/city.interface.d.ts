export interface CitySave {
  code: string;
  name: string;
  active: boolean;
}

export interface CityResponse extends CitySave {
  id: string;
  active_text: string;
}

export interface ICity extends Document {
  code: string;
  name: string;
  active: boolean;
}
