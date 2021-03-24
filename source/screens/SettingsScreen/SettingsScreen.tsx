import { useNavigation } from "@react-navigation/core";
import { DrawerScreenProps } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-elements";
import { AddUserData } from "../../firebase/UserDataHandler";
import { HomeDrawerParamList } from "../../types";
import styles from "../MedicalInfoScreen/styles";

export default function Settings(
  props: DrawerScreenProps<HomeDrawerParamList, "Home">
) {
  const nav = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  var saved = false;
  var user = props.route.params.user;
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (!user.settings)
      user.settings = {
        notificationsOn: true,
      };
    user.settings.notificationsOn = !isEnabled;
    saved = false;
  };
  async function save() {
    await AddUserData(user);
    saved = true;
    alert("Settings have been saved");
  }

  return (
    <View style={{ padding: 30 }}>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={{ fontSize: 20 }}>Push Notifications</Text>
        </View>
        <View style={{ marginLeft: 20 }}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "grey" : '"#f4f3f4"'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <Divider style={{ backgroundColor: "grey", height: 3, marginTop: 15 }} />
      <TouchableOpacity
        onPress={save}
        style={{
          backgroundColor: "#219ebc",
          padding: 5,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
}
