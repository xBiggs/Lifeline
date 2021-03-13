//AuthStackNavigator.tsx

import MedicalInfoScreen from "../screens/MedicalInfoScreen/MedicalInfoScreen";
import MedicationForm from "../screens/MedicationScreen/MedicationScreen";
import React, { Props, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import { HomeDrawerParamList, UserStackParamList } from "../types";
import {
  AssessmentScreen,
  HomeScreen,
  LoginScreen,
  PersonalInfoScreen,
} from "../screens";
import { User } from "../interfaces/User";
import { StackScreenProps } from "@react-navigation/stack";
import { Keyboard, Linking, Text } from "react-native";
import SafetyPlanScreen from "../screens/SafetyPlanScreen/SafetyPlanScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import VaultScreen from "../screens/VaultScreen/VaultScreen";
import DailyConversationsScreen from "../screens/DailyConversationsScreen/DailyConversationsScreen";
import SafetyPlanStackNavigator from "./SafetyPlanStackNavigator";

/**
 * USAGE: USED TO NAVIGATE BETWEEN AUTH SCREENS FOR A UNAUTHORIZED USER
 */
const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export default (props: StackScreenProps<UserStackParamList, "Home">) => {
  // Keyboard.dismiss();
  const user = props.route.params.user;
  //console.log('drawer user', user);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        unmountOnBlur: true,
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
        options={{ title: "Safety Plan" }}
        name="SafetyPlan"
        initialParams={{ user }}
        component={SafetyPlanStackNavigator}
      ></Drawer.Screen>
      {/* THESE SCREENS WILL NEED COMPONENTS */}
      <Drawer.Screen name="Vault" component={VaultScreen}></Drawer.Screen>
      <Drawer.Screen
        name="DailyConversations"
        options={{ title: "Daily Conversations" }}
        component={DailyConversationsScreen}
      ></Drawer.Screen>
      <Drawer.Screen name="Settings" component={SettingsScreen}></Drawer.Screen>
      <Drawer.Screen
        name="Medical_Information"
        initialParams={{ user }}
        component={MedicalInfoScreen}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Medication"
        initialParams={{ user }}
        component={MedicationForm}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};
const CustomDrawerContent = (props: any) => {
  // console.log(props)
  console.log("working");
  return <DrawerItem {...props} label="Home" onPress={() => {}}></DrawerItem>;
};
