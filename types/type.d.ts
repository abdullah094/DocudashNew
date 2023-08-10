import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { Industry } from './Step4';

export type RootStackParamList = {
  DashboardDrawerNavigator: DashBoardDrawerScreenProps<DashBoardDrawerParamList>;
  ManageDrawer: ManageDrawerScreenProps<ManageDrawerParamList>;
  SignUpIndex: NavigatorScreenParams<SignUpStackParamList>;
  TemplateHistory: undefined;
  AddSignature: { SignaturePreview?: SignaturePreview };
  AddStamp: { Stamp?: StampPreview };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

export type SignUpStackParamList = {
  Index: undefined;
  Step1: { api: string };
  Step2: { api: string };
  Step3: { api: string };
  Step4: { industry: Industry[]; signUpReasons: Industry[] };
  Step5: { token: string; email: string };
};

export type ManageDrawerParamList = {
  Inbox: { heading: string };
  Edit:
    | undefined
    | {
        Envelope?: Envelope;
        files?: DocumentPickerOptions.DocumentResult[];
        images?: ImagePicker.ImagePickerAsset[];
      };
  DocumentEditor: {
    Envelope: GenerateSignature;
  };
  Details: {
    Envelope: Envelope;
  };
};
export type DashBoardDrawerParamList = {
  Dashboard: undefined;
  Template: undefined;
  Signatures: {} | undefined;
  Stamps: {} | undefined;
  Profile: undefined;
  Browser: { url: string };
};

export type SignUpStackScreenProps<T extends keyof SignUpStackParamList> = CompositeScreenProps<
  StackScreenProps<SignUpStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type ManageDrawerScreenProps<T extends keyof ManageDrawerParamList> = CompositeScreenProps<
  DrawerScreenProps<ManageDrawerParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;
export type DashBoardDrawerScreenProps<T extends keyof DashBoardDrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DashBoardDrawerParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

interface Istep5Response {
  token: string;
  success: boolean;
  message: string;
  data: Data;
}

interface Istep3Response {
  token: string;
  success: boolean | null;
  message: string;
  data: Data;
}

export interface ViewDocument {
  success: boolean;
  message: string;
  generateSignature: GenerateSignature;
  generateSignatureDetails: GenerateSignatureDetail[];
  generateSignatureDetailsFinalise: GenerateSignatureDetailsFinalise;
}

export interface GenerateSignature {
  id?: number;
  signature_id: number;
  signature: string;
  uniqid: string;
  emailSubject: string;
  emailMessage: string;
  trash: number;
  draft_status: number;
  complete_incomplete: number;
  status: number;
  created_by: number;
  updated_by: number;
  deleted: number;
  created_at: date;
  updated_at: date;
  user: User;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  user_type: number;
  country: null;
  state: null;
  city: null;
  address1: null;
  address2: null;
  zip_code: string;
  video_call: null;
  licence_number: null;
  account_type: number;
  mobile: null | string;
  image: string;
  phone: string;
  verification_code: string;
  verification_status: number;
  verification_date: string;
  industry_id: number;
  sign_up_reasons_id: number;
  lat: null;
  long: null;
  steps: number;
  logged_in: number;
  logged_in_at: string;
  logged_out_at: string;
  ip_sign_up: string;
  location_sign_up: string;
  ip_sign_in: string;
  location_sign_in: string;
  email_verified_at: null;
  about_notary: null;
  hired_time: null;
  bussiness_start_up_date: null;
  status: number;
  deleted: number;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  trial_account_expired: number;
  trial_account: number;
  company: null;
  profile_photo_url: string;
}

export interface GenerateSignatureDetail {
  id: number;
  signature_id: number;
  uniqid: string;
  recName: string;
  recEmail: string;
  sign_type: string;
  emailSubject: string;
  emailMessage: string;
  access_code: string;
  private_message: string;
  hostName: string;
  hostEmail: string;
  recipient_id: number;
  trash: number;
  deleted_by: number;
  draft_status: number;
  complete_incomplete: number;
  status: number;
  created_by: number;
  updated_by: number;
  deleted: number;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface GenerateSignatureDetailsFinalise {
  id: number;
  signature_id: number;
  uniqid: string;
  getEditorContent: string;
  draggedElArr: string;
  status: number;
  created_by: number;
  updated_by: number;
  deleted: number;
  created_at: string;
  updated_at: string;
}

export interface InboxApiResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: Envelope[];
  input: Input;
}

export interface Envelope {
  id: number;
  signature_id: number;
  signature: string;
  uniqid: string;
  emailSubject: string;
  emailMessage: string;
  trash: number;
  draft_status: number;
  complete_incomplete: string;
  status: number;
  created_by: number;
  updated_by: number;
  deleted: number;
  created_at: string;
  updated_at: string;
  view_btn: string;
  download_btn: string;
  action: string;
  DT_RowIndex: number;
}

export interface Input {
  quick_search: null;
  draft_daterange: null;
}

export interface DashboardAPI {
  message: string;
  signature: Signature;
  status: boolean;
  user: User;
  WaitingForOthers: number;
  CompletedEmails: number;
}

export interface Signature {
  created_at: string;
  created_by: number;
  deleted: number;
  id: number;
  initial: string;
  signature: string;
  signature_code: string;
  status: number;
  updated_at: string;
  updated_by: number;
}

export interface User {
  about_notary: null;
  account_type: number;
  address1: null;
  address2: null;
  bussiness_start_up_date: null;
  city: null;
  company: null;
  country: null;
  created_at: string;
  created_by: number;
  deleted: number;
  email: string;
  email_verified_at: null;
  first_name: string;
  hired_time: null;
  id: number;
  image: string;
  industry_id: number;
  ip_sign_in: string;
  ip_sign_up: string;
  last_name: string;
  lat: null;
  licence_number: null;
  location_sign_in: string;
  location_sign_up: string;
  logged_in: number;
  logged_in_at: string;
  logged_out_at: string;
  long: null;
  mobile: null;
  name: string;
  phone: string;
  profile_photo: string;
  profile_photo_url: string;
  remains_days: number;
  sign_up_reasons_id: number;
  state: null;
  status: number;
  steps: number;
  trial_account: number;
  trial_account_expired: number;
  updated_at: string;
  updated_by: number;
  user_type: number;
  verification_code: string;
  verification_date: string;
  verification_status: number;
  video_call: null;
  zip_code: number;
}

export interface SignaturesListAPI {
  data: SignaturePreview[];
  draw: number;
  input: any[];
  recordsFiltered: number;
  recordsTotal: number;
}

export interface SignaturePreview {
  DT_RowIndex: number;
  action: string;
  created_at: string;
  created_by: number;
  deleted: number;
  id: number;
  initial: string;
  signature: string;
  signature_code: string;
  status: number;
  updated_at: string;
  updated_by: number;
}

///upload data api
export interface UploadDocumentAPI {
  status: boolean;
  message: string;
  generateSignatureDetails: GenerateSignatureDetail[];
  generateSignatureDetailsImages: GenerateSignatureDetailsImage[];
  uniqid: string;
  signature_id: number;
}

export interface GenerateSignatureDetailsImage {
  id: number;
  signature_id: number;
  uniqid: string;
  image: string;
  base64_encode_image: null;
  status: number;
  created_by: number;
  updated_by: number;
  deleted: number;
  created_at: string;
  updated_at: string;
}
//sign api
export interface SignUpAPI {
  success: boolean;
  message: string | { email: []; first_name: [] };
  next: string;
  data: SignUpData;
  next_access: string;
}

export interface SignUpData {
  id: number;
  first_name: null;
  last_name: null;
  name: null;
  email: string;
  user_type: number;
  country: null;
  state: null;
  city: null;
  address1: null;
  address2: null;
  zip_code: number;
  video_call: null;
  licence_number: null;
  account_type: number;
  mobile: null;
  image: string;
  phone: null;
  verification_code: null;
  verification_status: number;
  verification_date: null;
  industry_id: number;
  sign_up_reasons_id: number;
  lat: null;
  long: null;
  steps: number;
  logged_in: number;
  logged_in_at: null;
  logged_out_at: null;
  ip_sign_up: string;
  location_sign_up: string;
  ip_sign_in: null;
  location_sign_in: null;
  email_verified_at: null;
  about_notary: null;
  hired_time: null;
  bussiness_start_up_date: null;
  status: number;
  deleted: number;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  trial_account_expired: number;
  trial_account: number;
  company: null;
  profile_photo_url: string;
}

//stamp api
export interface StampListAPI {
  status: boolean;
  message: string;
  data: StampPagination;
}

export interface StampPagination {
  current_page: number;
  data: StampPreview[];
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

export interface StampPreview {
  id: number;
  title: string;
  image: string;
  image_base64: string;
  stamp_code: string;
  status: number;
  created_by: number;
  updated_by: number;
  deleted: number;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

//header Api
export interface HeaderAPI {
  data: HeaderOption;
  message: string;
  status: boolean;
}

export interface HeaderOption {
  Send_Documents_for_Signature: number;
  Upload_Your_Photo: number;
  adopt_your_signature: number;
  brand: number;
  percentage?: number;
  sign_up: number;
  template: number;
}
// Html Editor

export interface HtmlEditorAPI {
  status: boolean;
  message: string;
  generateSignatureDetails: GenerateSignatureDetail[];
  generateSignatureDetailsFinalise: GenerateSignatureDetails;
  generateSignatureDetailsImages: GenerateSignatureDetails[];
  uniqid: string;
  signature_id: string;
}

export interface GenerateSignatureDetails {
  id: number;
  signature_id: number;
  uniqid: string;
  getEditorContent?: string;
  draggedElArr?: DraggedElArr;
  status: number;
  created_by: number;
  updated_by: number;
  deleted: number;
  created_at: string;
  updated_at: string;
  image?: string;
  base64_encode_image?: null;
}

export interface DraggedElArr {
  signature: DraggedElement[];
  initial: DraggedElement[];
  stamp: DraggedElement[];
  date: DraggedElement[];
  name: DraggedElement[];
  email: DraggedElement[];
  company: DraggedElement[];
  title: DraggedElement[];
}

export interface DraggedElement {
  type: string;
  icon: string;
  name: string;
  uuid: number;
  left: string;
  top: string;
  element_container_id: string;
  selected_user_id: string;
  colors: Colors;
}

export interface Colors {
  primary: string;
  bg: string;
}
