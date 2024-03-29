import MedicationForm from "../screens/MedicationScreen/MedicationScreen";
import React, { useEffect, useRef, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeDrawerParamList, LifeLineBlue, LifeLineDarkBlue, UserStackParamList } from "../types";
import { AssessmentScreen, HomeScreen, PersonalInfoScreen } from "../screens";
import { StackScreenProps } from "@react-navigation/stack";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import DailyConversationsScreen from "../screens/DailyConversationsScreen/DailyConversationsScreen";
import SafetyPlanStackNavigator from "./SafetyPlanStackNavigator";
import AppointmentsScreen from "../screens/AppointmentsScreen/AppointmentsScreen";
import HomeDrawer from "./HomeDrawer";
import VaultStackNavigator from "./VaultStackNavigator";
import * as Notifications from "expo-notifications";
import { askPermissions } from "../Controllers/notificationsController";
import { Subscription } from '@unimodules/core';

/**
 * USAGE: USED TO NAVIGATE BETWEEN AUTH SCREENS FOR A UNAUTHORIZED USER
 */
const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export default (props: StackScreenProps<UserStackParamList,'Home'>) => {

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<Notifications.Notification>();


  // Keyboard.dismiss();
  const user = props.route.params.user;

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <HomeDrawer drawerProps={props} user={user}></HomeDrawer>
      )}
      screenOptions={{
        headerShown: true,
        unmountOnBlur: true,
        headerTintColor:'white',
        headerTitleAlign:'center',
        headerStyle:{
          backgroundColor:'black',
        }
      }}
    >
      <Drawer.Screen
        name="Home"
        initialParams={{ user }}
        component={HomeScreen}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Assessment"
        initialParams={{ user }}
        component={AssessmentScreen}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Information"
        initialParams={{ user }}
        component={PersonalInfoScreen}
      ></Drawer.Screen>
      <Drawer.Screen
        options={{ title: "Safety Plan",}}
        name="SafetyPlan"
        initialParams={{ user }}
        component={SafetyPlanStackNavigator}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Vault"
        initialParams={{ user }}
        component={VaultStackNavigator}
      ></Drawer.Screen>
      <Drawer.Screen
        name="DailyConversations"
        options={{ title: "Daily Conversations" }}
        initialParams={{ user }}
        component={DailyConversationsScreen}
      ></Drawer.Screen>

      <Drawer.Screen name="Settings" component={SettingsScreen}></Drawer.Screen>

      <Drawer.Screen
        name="Medication"
        initialParams={{ user }}
        component={MedicationForm}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Appointments"
        initialParams={{ user }}
        component={AppointmentsScreen}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};