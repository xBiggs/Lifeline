import { useNavigation } from "@react-navigation/core";
import { DrawerScreenProps } from "@react-navigation/drawer";
import React, { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-elements";
import {
  askPermissions,
  cancelNotifications,
  getSecondsBetweenDates,
  schedulePushNotification,
  scheduleRecurringPushNotification,
} from "../../Controllers/notificationsController";
import { AddUserData } from "../../firebase/UserDataHandler";
import { Medication, MedicationInfo } from "../../interfaces/MedicalInfo";
import { User } from "../../interfaces/User";
import { HomeDrawerParamList } from "../../types";

export async function resetNotifications(user: User) {
 await cancelNotifications();
  await updateNotifications(user);
  await AddUserData(user);
}

async function updateNotifications(user: User) {
  user.medInfo?.medication.forEach(async(med: Medication) => {
    scheduleRecurringPushNotification(
      "Medication Alert",
      "Need to take medication: " + med.name,
      "MedicationScreen",
      med.timeInBetween * 60
    );
    const today: Date = new Date();


    const refill: Date = new Date(med.refillDate);
    const secondsBetweenDates = getSecondsBetweenDates(today, refill);

    await schedulePushNotification(
      "Medication Alert",
      "Need to refill: " + med.name,
      "MedicationScreen",
      secondsBetweenDates
    );
  });
  user.medInfo?.nextApointment?.forEach(async(appointment) => {
    const today: Date = new Date();
    const secondsBetweenDates = getSecondsBetweenDates(
      today,
      appointment.date.toDate()
    );

    await schedulePushNotification(
      "Apointment Alert",
      "You have an upcoming appointment",
      "click to view reason",
      secondsBetweenDates - 86400
    );
  });

  try {
    const today: Date = new Date();
    const tomorrow: Date = new Date();
    tomorrow.setDate(today.getDate() + 1)
    await scheduleRecurringPushNotification(
      "Daily Conversations Alert",
      "Respond to daily conversations",
      "DailyConversations",


      getSecondsBetweenDates(today, tomorrow)
    );
  } catch (e) {
    alert((e as Error).message);
  }

  try {
    const today: Date = new Date();
    const tomorrow: Date = new Date();
    tomorrow.setDate(today.getDate() + 3);

    await scheduleRecurringPushNotification(
      "Vault Alert",
      "Check out the Vault!",
      "Vault",
      getSecondsBetweenDates(today, tomorrow)
    );
  } catch (e) {
    alert((e as Error).message);
  }
}

export default function Settings(
  props: DrawerScreenProps<HomeDrawerParamList, "Home">
) {
  const nav = useNavigation();
  var saved = false;
  var user = props.route.params.user;
  const [isEnabled, setIsEnabled] = useState(user.settings?.notificationsOn);

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
    if (!user.settings?.notificationsOn) cancelNotifications();
    else {
      updateNotifications(user);
    }
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
