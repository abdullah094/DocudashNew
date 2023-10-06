export interface NotaryLocation {
  UserAddress: UserAddress[];
}

export interface UserAddress {
  id: number;
  user_id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  lat: string;
  long: string;
  uuid: string;
  status: number;
  created_by: number;
  updated_by: number;
  deleted: number;
  created_at: Date;
  updated_at: Date;
}
