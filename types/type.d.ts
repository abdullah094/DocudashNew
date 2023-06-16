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
  
  export type SignupStackScreenProps<T extends keyof SignupStackParamList> =
    CompositeScreenProps<
      StackScreenProps<SignupStackParamList, T>,
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
