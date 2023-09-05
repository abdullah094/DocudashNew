import { AddContact } from '@screens/Contact/AddContact';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
  DrawerScreenProps,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { pet } from './pet';
import { Envelope } from './envelope';
import { Recipient } from './recipient';
import { Contact } from './contact';

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeDrawerParamList>;
  NotFound: undefined;
  Browser: { url: string; heading: string };
  Signatures: {} | undefined;
  AddSignature: { SignaturePreview?: SignaturePreview };
  Inbox: { heading: string };
  Edit:
    | undefined
    | {
        Envelope?: Envelope;
        files?: DocumentPickerOptions.DocumentResult[];
        images?: ImagePicker.ImagePickerAsset[];
        Recipients: Recipient[];
      };
  DocumentEditor: {
    Envelope: GenerateSignature;
  };
  Details: {
    Envelope: Envelope;
    heading: string;
  };
  Stamps: {} | undefined;
  AddStamp: { Stamp?: StampPreview };
  Profile: undefined;
  SignUpIndex: undefined;
  Template: undefined;
  DocumentViewer: { Envelope: envelope; item: SignaturePreview };
  SignatureSelection: envelope;
  StampSelection: envelope;
  AddRecipient: { Recipients: Recipient[]; Recipient: Recipient };
  Contacts: {} | undefined;
  AddContact: { Contact?: Contact };
};

export type SignUpStackParamList = {
  Index: undefined;
  Step1: { api: string };
  Step2: { api: string };
  Step3: { api: string };
  Step4: { industry: Industry[]; signUpReasons: Industry[] };
  Step5: { token: string; email: string };
  Browser: { url: string; heading: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

export type HomeDrawerParamList = {
  HomeScreen: undefined;
  Latest: undefined;
  INBOX: { heading: string };
};

export type HomeDrawerScreenProps<T extends keyof HomeDrawerParamList> = CompositeScreenProps<
  DrawerScreenProps<HomeDrawerParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type SignUpStackScreenProps<T extends keyof SignUpStackParamList> = CompositeScreenProps<
  StackScreenProps<SignUpStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
