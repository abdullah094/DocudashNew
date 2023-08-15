import type {
  CompositeScreenProps,
  NavigatorScreenParams,
  DrawerScreenProps,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { pet } from './pet';

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
      };
  DocumentEditor: {
    Envelope: GenerateSignature;
  };
  Details: {
    Envelope: Envelope;
  };
  Stamps: {} | undefined;
  AddStamp: { Stamp?: StampPreview };
  Profile: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

export type HomeDrawerParamList = {
  HomeScreen: undefined;
  Latest: undefined;
};

export type HomeDrawerScreenProps<T extends keyof HomeDrawerParamList> = CompositeScreenProps<
  DrawerScreenProps<HomeDrawerParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
