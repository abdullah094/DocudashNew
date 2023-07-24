import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { colors } from "../../Colors";
import { DataTable } from "react-native-paper";

const Index = () => {
  return (
    <View>
      <View style={tw`m-5 gap-1`}>
        <Text style={tw`text-black text-5 font-bold `}>Signautres</Text>
        <Text style={tw`text-[${colors.gray}] text-3`}>
          Add or update your name and signature styles.
        </Text>
        <TouchableOpacity
          style={tw`bg-[${colors.green}] justify-center items-center w-35 h-10 rounded-md self-end m-4`}
        >
          <Text style={tw`text-white`}>Add Signature</Text>
        </TouchableOpacity>
      </View>
      <View>
        <DataTable style={tw``}>
          <DataTable.Header>
            <DataTable.Title>Signatures</DataTable.Title>
            <DataTable.Title numeric>Initials</DataTable.Title>
            <DataTable.Title numeric>Signatures code</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell style={tw`bg-red-200 items-center`}>
              <Image
                style={tw`w-20 h-4`}
                resizeMode="contain"
                source={require("../../assets/docudash_pow_logo.png")}
              />
            </DataTable.Cell>
            <DataTable.Cell style={tw`bg-purple-200 items-center`}>
              <Image
                style={tw`w-5 h-4`}
                resizeMode="contain"
                source={require("../../assets/docudash_pow_logo.png")}
              />
            </DataTable.Cell>
            <DataTable.Cell
              style={tw`bg-orange-200 items-center`}
              textStyle={tw`text-2.5 text-[${colors.gray}]`}
            >
              {"5qDXe96-pkhNTj-55211"}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
