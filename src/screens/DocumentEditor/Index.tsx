import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Index = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params?.files;
  console.log(item);

  return (
    <View style={tw`h-full `}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={"Sign"} />
      </Appbar.Header>
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-1`}>
          <FlatList
            data={item}
            renderItem={({ item }) => (
              <View>
                <Image style={tw`h-100`} source={{ uri: item.uri }} />
              </View>
            )}
          />
        </View>
        <View style={tw`p-3  bg-white bottom-0 `}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* draw */}
            <View style={styles.botton_view_buttons}>
              <View style={styles.yellow_round}>
                <MaterialCommunityIcons name="draw" color={"black"} size={20} />
              </View>
              <Text style={styles.yellow_round_text}>Signature</Text>
            </View>
            {/* Initials */}
            <View style={styles.botton_view_buttons}>
              <View style={styles.yellow_round}>
                <MaterialCommunityIcons
                  name="signature-text"
                  color={"black"}
                  size={20}
                />
              </View>
              <Text style={styles.yellow_round_text}>Initials</Text>
            </View>
            {/* Date */}
            <View style={styles.botton_view_buttons}>
              <View style={styles.yellow_round}>
                <MaterialCommunityIcons
                  name="calendar"
                  color={"black"}
                  size={20}
                />
              </View>
              <Text style={styles.yellow_round_text}>Date</Text>
            </View>
            {/* Text box */}
            <View style={styles.botton_view_buttons}>
              <View style={styles.yellow_round}>
                <MaterialCommunityIcons
                  name="format-text"
                  color={"black"}
                  size={20}
                />
              </View>
              <Text style={styles.yellow_round_text}>Textbox</Text>
            </View>
            {/* Name */}
            <View style={styles.botton_view_buttons}>
              <View style={styles.yellow_round}>
                <MaterialCommunityIcons
                  name="face-man"
                  color={"black"}
                  size={20}
                />
              </View>
              <Text style={styles.yellow_round_text}>Name</Text>
            </View>
          </ScrollView>
        </View>
        <View style={tw`flex-row p-3 bg-white items-center justify-between`}>
          <View style={tw`flex-row gap-2`}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="chevron-down"
                color={"black"}
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="chevron-up"
                color={"black"}
                size={40}
              />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row gap-2`}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="magnify"
                color={"black"}
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-horizontal"
                color={"black"}
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  botton_view_buttons: tw`items-center mx-2 w-20 h-20 gap-1 justify-center`,
  yellow_round: tw`h-12 w-12 rounded-full bg-yellow-200 justify-center items-center`,
  yellow_round_text: tw``,
});
