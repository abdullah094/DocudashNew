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
  BannerImage: null | string;
  BioDescription: null | string;
  ProofOfEmployes: number;
  ProofOfEmployesDoc: null | string;
  ShortDescription: null | string;
  about_notary: null;
  account_type: number;
  address1: string;
  address2: null | string;
  bussiness_start_up_date: null;
  city: null;
  company: null;
  country: null | string;
  created_at: string;
  created_by: number;
  deleted: number;
  email: string;
  email_verified_at: null;
  first_name: string;
  here: string;
  hired_time: null;
  id: number;
  image: string;
  industry_id: number;
  ip_sign_in: null | string;
  ip_sign_up: string;
  last_name: string;
  lat: string;
  licence_number: null;
  location_sign_in: string;
  location_sign_up: locationNotary;
  logged_in: number;
  logged_in_at: null | string;
  logged_out_at: null | string;
  long: string;
  mobile: null;
  name: string;
  notary_document: null | string;
  notary_document_staus: number;
  notary_image: string;
  phone: string;
  profile_photo_url: string;
  sign_up_reasons_id: number;
  state: null | string;
  status: number;
  steps: number;
  trial_account: number;
  trial_account_expired: number;
  updated_at: string;
  updated_by: number;
  user_roles: UserRoles;
  user_type: number;
  verification_code: string;
  verification_code_expire_at: null | string;
  verification_date: string;
  verification_status: number;
  video_call: null;
  zip_code: number;
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
