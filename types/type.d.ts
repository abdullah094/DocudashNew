import type {
    CompositeScreenProps,
    NavigatorScreenParams,
  } from '@react-navigation/native';
  import type { StackScreenProps } from '@react-navigation/stack';
  import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Industry } from './Step4';
  
  export type RootStackParamList = {
    SignUpIndex: NavigatorScreenParams<SignupStackParamList>;
    TabNavigator: NavigatorScreenParams<SignupStackParamList>;
    ManageDrawer:  NavigatorScreenParams<SignupStackParamList>;
    LoginIndex:  NavigatorScreenParams<LoginStackParamList>;
    Details:  NavigatorScreenParams<SignedInStackParamList>
    TemplateHistory: undefined
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
  
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }

  interface Istep5Response{
    token:   string;
    success: boolean |null;
    message: string;
    data:    Data;
  }

  interface Istep3Response {
    token:   string;
    success: boolean |null;
    message: string;
    data:    Data;
  }
