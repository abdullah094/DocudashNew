import { useNavigation, useRoute } from '@react-navigation/native';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';
import tw from 'twrnc';
import { SignaturePreview } from '../../../../types';
// import { DocumentNavigationProps, DocumentRouteProps } from "../types";

interface ISignatureDraw {
  setSetselectedUri: Dispatch<SetStateAction<string | null>>;
  setSetselectedInitialUri: Dispatch<SetStateAction<string | undefined | null>>;
}

const Signature = ({ setSetselectedUri, setSetselectedInitialUri }: ISignatureDraw) => {
  const navigation = useNavigation();
  const route = useRoute();
  const signaturePreview = route.params as SignaturePreview;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [sign, setSign] = React.useState<string | null>(null);
  const [initials, setInitials] = useState<string | null>(null);
  const signatureView = useRef<null | SignatureViewRef>(null);
  const signatureViewIni = useRef<null | SignatureViewRef>(null);
  // signatureView.current.changePenSize(10,20)

  const saveSign = () => {
    signatureView.current?.readSignature();
  };
  const saveInitials = () => {
    signatureViewIni.current?.readSignature();
  };

  const resetSign = () => {
    signatureView.current?.clearSignature();
    setSetselectedUri(null);
  };
  const resetInitials = () => {
    signatureViewIni.current?.clearSignature();
    setSetselectedInitialUri(null);
  };
  const handleOK = (signature: string) => {
    const base64 = signature.replace('data:image/png;base64,', '');
    setSetselectedUri(base64);
  };
  const handleOKIni = (signature: string) => {
    const base64 = signature.replace('data:image/png;base64,', '');
    setSetselectedInitialUri(base64);
  };

  const style = `
    .m-signature-pad {
      margin:auto;
      top:50;
    }
    body,html {
    width: 380px; height: 200px;
      .m-signature-pad--footer {display: none; margin: 0px;}`;
  return (
    <ScrollView scrollEnabled={scrollEnabled} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={[{ flex: 1 }, tw`gap-3`]}>
        <Appbar mode="small">
          <Appbar.Content title="Signature" />
          {/* <Appbar.Action icon="content-save" onPress={saveSign} /> */}
          <Appbar.Action icon="delete-outline" onPress={resetSign} />
        </Appbar>
        <View style={{ height: 200, width: windowWidth, marginTop: 6 }}>
          <SignatureScreen
            ref={signatureView}
            onBegin={() => setScrollEnabled(false)}
            onEnd={() => {
              setScrollEnabled(true);
              saveSign();
            }}
            onOK={handleOK}
            dataURL={signaturePreview?.signature}
            webStyle={style}
          />
        </View>
        <Appbar mode="small">
          <Appbar.Content title="Initials" />
          {/* <Appbar.Action icon="content-save" onPress={saveInitials} /> */}
          <Appbar.Action icon="delete-outline" onPress={resetInitials} />
        </Appbar>
        <View style={{ height: 200, width: windowWidth, marginTop: 6 }}>
          <SignatureScreen
            ref={signatureViewIni}
            onBegin={() => setScrollEnabled(false)}
            onEnd={() => {
              setScrollEnabled(true);

              saveInitials();
            }}
            onOK={handleOKIni}
            dataURL={signaturePreview?.initial}
            webStyle={style}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Signature;

const styles = StyleSheet.create({});
