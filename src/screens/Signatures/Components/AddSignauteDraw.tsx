import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import { Appbar } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import tw from "twrnc";
import {
  degrees,
  encodeToBase64,
  PDFDocument,
  rgb,
  StandardFonts,
} from "pdf-lib";
import tailwind from "twrnc";
import { SignaturePreview } from "../../../../types";
// import { DocumentNavigationProps, DocumentRouteProps } from "../types";

const Signature = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const signaturePreview = route.params as SignaturePreview;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [data, setData] = React.useState(null);
  const signatureView = useRef<SignatureViewRef>({} as SignatureViewRef);
  // signatureView.current.changePenSize(10,20)

  const saveSign = () => {
    signatureView.current.readSignature();
  };

  const resetSign = () => {
    signatureView.current.clearSignature();
    setData(null);
  };

  const onSave = function (signature: string) {
    EditPdf(signature);
  };

  const EditPdf = async (imageURI: string | Uint8Array | ArrayBuffer) => {
    let options = { encoding: FileSystem.EncodingType.Base64 };
    const base64 = await FileSystem.readAsStringAsync(pdfPath, options)
      .then((data) => {
        console.log(data);
        return data; // are you sure you want to resolve the data and not the base64 string?
      })
      .catch((err) => {
        console.log("​getFile -> err", err);
        return err;
      });
    // This should be a Uint8Array or ArrayBuffer
    // This data can be obtained in a number of different ways
    // If your running in a Node environment, you could use fs.readFile()
    // In the browser, you could make a fetch() call and use res.arrayBuffer()
    const existingPdfBytes = base64;

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize();

    // Draw a string of text diagonally across the first page
    // firstPage.drawText("This text was added with JavaScript!", {
    //   x: 5,
    //   y: height / 2 + 300,
    //   size: 50,
    //   font: helveticaFont,
    //   color: rgb(0.95, 0.1, 0.1),
    //   rotate: degrees(-45),
    // });
    // Embed the JPG image bytes and PNG image bytes
    const pngImage = await pdfDoc.embedPng(imageURI);
    // Get the width/height of the JPG image scaled down to 25% of its original size

    // Get the width/height of the PNG image scaled down to 50% of its original size
    const pngDims = pngImage.scale(0.25);
    console.log(pngDims);
    // Draw the PNG image near the lower right corner of the JPG image
    firstPage.drawImage(pngImage, {
      x: width / 2 - pngDims.width / 2 + 75,
      y: height / 2 - pngDims.height,
      width: pngDims.width,
      height: pngDims.height,
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.saveAsBase64();

    FileSystem.writeAsStringAsync(pdfPath, pdfBytes, {
      encoding: FileSystem.EncodingType.Base64,
    }).then((data) => {
      console.log("File saved:", data);
      navigation.navigate("DocumentList");
    });

    // For example, `pdfBytes` can be:
    //   • Written to a file in Node
    //   • Downloaded from the browser
    //   • Rendered in an <iframe>
  };

  const style = `
    .m-signature-pad {
      margin:auto;
      top:0;
    }
    body,html {
    width: ${windowWidth}px; height: ${windowHeight}px;
      .m-signature-pad--footer {display: none; margin: 0px;}`;
  return (
    <ScrollView>
      <View style={[{ flex: 1 }, tw`gap-3`]}>
        <Appbar mode="small">
          <Appbar.Content title="Signature" />
          <Appbar.Action icon="content-save" onPress={saveSign} />
          <Appbar.Action icon="delete-outline" onPress={resetSign} />
        </Appbar>
        <View style={{ height: 200, width: windowWidth, marginTop: 6 }}>
          <SignatureScreen
            ref={signatureView}
            onBegin={() => setScrollEnabled(false)}
            onEnd={() => setScrollEnabled(true)}
            onOK={onSave}
            dataURL={signaturePreview?.signature}
            webStyle={style}
          />
        </View>
        <Appbar mode="small">
          <Appbar.Content title="Initial" />
          <Appbar.Action icon="content-save" onPress={saveSign} />
          <Appbar.Action icon="delete-outline" onPress={resetSign} />
        </Appbar>
        <View style={{ height: 200, width: windowWidth, marginTop: 6 }}>
          <SignatureScreen
            ref={signatureView}
            onBegin={() => setScrollEnabled(false)}
            onEnd={() => setScrollEnabled(true)}
            onOK={onSave}
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
