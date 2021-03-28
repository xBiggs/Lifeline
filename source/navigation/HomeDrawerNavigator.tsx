//AuthStackNavigator.tsx

import MedicalInfoScreen from "../screens/MedicalInfoScreen/MedicalInfoScreen";
import MedicationForm from "../screens/MedicationScreen/MedicationScreen";
import React, { Props, useState } from "react";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { HomeDrawerParamList, UserStackParamList } from "../types";
import { AssessmentScreen, HomeScreen, PersonalInfoScreen } from "../screens";
import { StackScreenProps } from "@react-navigation/stack";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import VaultScreen from "../screens/VaultScreen/VaultScreen";
import DailyConversationsScreen from "../screens/DailyConversationsScreen/DailyConversationsScreen";
import SafetyPlanStackNavigator from "./SafetyPlanStackNavigator";
import AppointmentsScreen from "../screens/AppointmentsScreen/AppointmentsScreen";
import HomeDrawer from "./HomeDrawer";
import ManageVaultItems from "../screens/VaultScreen/components/ManageVaultItems";
import VaultStackNavigator from "./VaultStackNavigator";

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
      drawerContent={(props) => (
        <HomeDrawer drawerProps={props} user={user}></HomeDrawer>
      )}
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
        name="Medical_Information"
        options={{ title: "Medical Information" }}
        initialParams={{ user }}
        component={MedicalInfoScreen}
      ></Drawer.Screen>
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