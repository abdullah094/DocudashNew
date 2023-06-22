import { StyleSheet } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import tw from "twrnc";
import {
  Dialog,
  Text as LulliText,
  View as LulliView,
} from "react-native-ui-lib"; // eslint-disable-line
import { colors } from "../Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IPopup {
  heading: string | null;
  description: string | null;
  alert: boolean;
  setAlert: Dispatch<SetStateAction<boolean>>;
}

export const Popup = ({ heading, alert, description, setAlert }: IPopup) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    setIsVisible(alert);
    console.log(alert);
  }, [alert]);

  return (
    <Dialog
      visible={isVisible}
      onDismiss={() => {
        setIsVisible(false);
        setAlert(false);
      }}
      // panDirection={PanningProvider.Directions.DOWN}
    >
      <LulliView style={tw`bg-[${colors.green}] p-3 pt-5 rounded-xl `}>
        <LulliText style={tw`text-[${colors.white}] text-5 font-bold`}>
          {heading}
        </LulliText>

        <LulliView style={tw`mt-2`}>
          <LulliText style={tw`text-[${colors.white}] text-4`}>
            {description}
          </LulliText>
        </LulliView>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(false);
            setAlert(false);
          }}
          style={tw`bg-[${colors.blue}] items-center justify-center py-2 rounded-2xl mt-3`}
        >
          <LulliText style={tw`text-[${colors.white}]`}>Close</LulliText>
        </TouchableOpacity>
      </LulliView>
    </Dialog>
  );
};

const styles = StyleSheet.create({});
