//AuthStackNavigator.tsx
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeDrawerParamList, UserStackParamList } from "../types";
import {
  AssessmentScreen,
  HomeScreen,
  LoginScreen,
  PersonalInfoScreen,
} from "../screens";
import { User } from "../interfaces/User";
import { StackScreenProps } from "@react-navigation/stack";
import { Text } from "react-native";
import SafetyPlanScreen from "../screens/SafetyPlanScreen/SafetyPlanScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import VaultScreen from "../screens/VaultScreen/VaultScreen";
import DailyConversationsScreen from "../screens/DailyConversationsScreen/DailyConversationsScreen";
import MedicalInfoScreen from "../screens/MedicalInfoScreen/MedicalInfoScreen";
import MedicationForm from "../screens/MedicationScreen/MedicationScreen";

/**
 * USAGE: USED TO NAVIGATE BETWEEN AUTH SCREENS FOR A UNAUTHORIZED USER
 */
const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export default (props: StackScreenProps<UserStackParamList, "Home">) => {
  const user = props.route.params.user;
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
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
        name="Medication"
        initialParams={{ user }}
        component={MedicationForm}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Information"
        initialParams={{ user }}
        component={PersonalInfoScreen}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Medical_Information"
        initialParams={{ user }}
        component={MedicalInfoScreen}
      ></Drawer.Screen>
      {/* THESE SCREENS WILL NEED COMPONENTS */}
      <Drawer.Screen
        options={{ title: "Safety Plan" }}
        name="SafetyPlan"
        component={SafetyPlanScreen}
      ></Drawer.Screen>
      <Drawer.Screen name="Vault" component={VaultScreen}></Drawer.Screen>
      <Drawer.Screen
        name="DailyConversations"
        options={{ title: "Daily Conversations" }}
        component={DailyConversationsScreen}
      ></Drawer.Screen>
      <Drawer.Screen name="Settings" component={SettingsScreen}></Drawer.Screen>
    </Drawer.Navigator>
  );
};
