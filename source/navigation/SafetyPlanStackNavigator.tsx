import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SafetyPlanScreen from "../screens/SafetyPlanScreen/SafetyPlanScreen";
import CopingStrategiesScreen from "../screens/SafetyPlanScreen/CopingStrategiesScreen/";
import { HomeDrawerParamList, SafetyPlanStackParamList } from "../types";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Keyboard } from "react-native";
import ContactAccessForm from "../Forms/ContactAccessForm";
import EmergencyContactScreen from "../screens/SafetyPlanScreen/EmergencyContactScreen/EmergencyContactScreen";
import SocialEngagementsScreen from "../screens/SafetyPlanScreen/SocialEngagementsScreen/";
import WarningSignsScreen from "../screens/SafetyPlanScreen/WarningSignsScreen/WarningSignsScreen";
import LocationServivesScreen from "../screens/SafetyPlanScreen/LocationServicesScreen/LocationServivesScreen";
import EmergencyLocationScreen from "../screens/SafetyPlanScreen/EmergencyLocationScreen/EmergencyLocationScreen";
import Vault from "../screens/VaultScreen/VaultScreen";

const Stack = createStackNavigator<SafetyPlanStackParamList>();

export default (
  props: DrawerScreenProps<HomeDrawerParamList, "SafetyPlan">
) => {
  props.navigation.addListener("drawerOpen", (e) => {
    Keyboard.dismiss();
  });
  const { user } = props.route.params;

  return (
    <Stack.Navigator headerMode="none"
    screenOptions={
      {
        headerTitleAlign:'center'
      }
    }>

      <Stack.Screen
        name="Home"
        initialParams={{ user }}
        component={SafetyPlanScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="CopingStrategies"
        options={{
          title:"Coping Strategies"
        }}
        initialParams={{ user }}
        component={CopingStrategiesScreen}
      ></Stack.Screen>
      <Stack.Screen
        options={{title:'Emergency Contacts'}}
        name="EmergencyContact"
        initialParams={{ user }}
        component={EmergencyContactScreen}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          title:"Device Contacts"
        }}
        name="AccessDeviceContacts"
        initialParams={{ user }}
        component={ContactAccessForm}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          title:"Social Engagements"
        }}
        name="SocialEngagements"
        initialParams={{ user }}
        component={SocialEngagementsScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="WarningSigns"
        options={{
          title:"Warning Signs"
        }}
        initialParams={{ user }}
        component={WarningSignsScreen}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          title:"Location Services"
        }}
        name="LocationServices"
        initialParams={{ user }}
        component={LocationServivesScreen}
      ></Stack.Screen>

    <Stack.Screen
        name="EmergencyLocations"
        initialParams={{ user }}
        component={EmergencyLocationScreen}
   ></Stack.Screen>

      <Stack.Screen
        name="Vault"
        initialParams={{ user }}
        component={Vault}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
