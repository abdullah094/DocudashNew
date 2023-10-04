// To parse this data:
//
//   import { Convert, NotaryList } from "./file";
//
//   const notaryList = Convert.toNotaryList(json);

export interface NotaryList {
  status: boolean;
  Notary: Notary;
}

export interface Notary {
  current_page: number;
  data: Notaries[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}
export interface locationNotary {
  areaCode: string;
  cityName: string;
  countryCode: string;
  countryName: string;
  driver: string;
  ip: string;
  isoCode: null;
  latitude: string;
  longitude: string;
  metroCode: null;
  postalCode: null;
  regionCode: string;
  regionName: string;
  timezone: string;
  zipCode: string;
}
export interface Notaries {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  user_type: number;
  country: string;
  state: string;
  city: string;
  address1: string;
  address2: string;
  zip_code: number;
  video_call: null;
  licence_number: string;
  account_type: number;
  mobile: null;
  image: string;
  phone: string;
  verification_code: string;
  verification_status: number;
  verification_date: string;
  industry_id: number;
  sign_up_reasons_id: number;
  lat: string;
  long: string;
  steps: number;
  logged_in: number;
  logged_in_at: string;
  logged_out_at: string;
  ip_sign_up: string;
  location_sign_up: string;
  ip_sign_in: string;
  location_sign_in: string;
  email_verified_at: null;
  about_notary: string;
  hired_time: string;
  bussiness_start_up_date: string;
  status: number;
  deleted: number;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  trial_account_expired: number;
  trial_account: number;
  company: null;
  notary_document: null;
  notary_document_staus: number;
  verification_code_expire_at: string;
  BannerImage: string;
  BioDescription: null;
  ShortDescription: null;
  ProofOfEmployes: number;
  ProofOfEmployesDoc: null;
  here: string;
  notary_image: string;
  profile_photo_url: string;
  user_roles: UserRoles;
}

export interface UserRoles {
  id: number;
  title: string;
  status: number;
  deleted: number;
  deleted_by: number;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
