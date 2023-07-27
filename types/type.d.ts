import type {
<<<<<<< HEAD
    CompositeScreenProps,
    NavigatorScreenParams,
  } from '@react-navigation/native';
  import type { StackScreenProps } from '@react-navigation/stack';
  import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
  import type { DrawerScreenProps } from '@react-navigation/drawer';
import { Industry } from './Step4';
  
  export type RootStackParamList = {
    SignUpIndex: NavigatorScreenParams<SignupStackParamList>;
    TabNavigator: NavigatorScreenParams<SignupStackParamList>;
    ManageDrawer:  NavigatorScreenParams<SignupStackParamList>;
    LoginIndex:  NavigatorScreenParams<LoginStackParamList>;
    Details:  NavigatorScreenParams<SignedInStackParamList>
    TemplateHistory: undefined
    Signatures: undefined
    AddSignature: undefined
  };
  
  export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;
  
  export type SignupStackParamList = {
    Step1: undefined;
    Step2:{api:string}
    Step3: {api:string};
    Step4: {api:string};
    Step5: {industry :Industry[],signUpReasons:Industry[]};
    
  };
  export type LoginStackParamList = {
    Step1: undefined;
    Step2:{token:string,email:string};
    Inbox: {heading:string};
    
  };
  export type SignedInStackParamList = {
    Inbox: undefined;
    Details: undefined
   
    
  };
=======
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import { Industry } from "./Step4";
>>>>>>> bbcbb4d4ecdc22a5915ca3718f4dac78cd84faa8

export type RootStackParamList = {
  SignUpIndex: NavigatorScreenParams<SignupStackParamList>;
  TabNavigator: NavigatorScreenParams<SignupStackParamList>;
  ManageDrawer: NavigatorScreenParams<SignupStackParamList>;
  LoginIndex: NavigatorScreenParams<LoginStackParamList>;
  Details: NavigatorScreenParams<SignedInStackParamList>;
  TemplateHistory: undefined;
  Signatures: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type SignupStackParamList = {
  Step1: undefined;
  Step2: { api: string };
  Step3: { api: string };
  Step4: { api: string };
  Step5: { industry: Industry[]; signUpReasons: Industry[] };
};
export type LoginStackParamList = {
  Step1: undefined;
  Step2: { token: string; email: string };
  Inbox: { heading: string };
};
export type SignedInStackParamList = {
  Inbox: undefined;
  Details: undefined;
};

export type ManageDrawerParamList = {
  Inbox: { heading: string };
};

export type SignupStackScreenProps<T extends keyof SignupStackParamList> =
  CompositeScreenProps<
    StackScreenProps<SignupStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
export type LoginStackScreenProps<T extends keyof LoginStackParamList> =
  CompositeScreenProps<
    StackScreenProps<LoginStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
export type SignedInpStackScreenProps<T extends keyof SignedInStackParamList> =
  CompositeScreenProps<
    StackScreenProps<SignedInStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
export type ManageDrawerScreenProps<T extends keyof ManageDrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<ManageDrawerParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

interface Istep5Response {
  token: string;
  success: boolean | null;
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
  id: number;
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
  created_at: string;
  updated_at: string;
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
  zip_code: number;
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
  sign_type: number;
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
