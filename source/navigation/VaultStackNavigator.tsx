import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeDrawerParamList, VaultStackParamList } from "../types";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Keyboard } from "react-native";
import Vault from "../screens/VaultScreen/VaultScreen";
import ManageVaultItems from "../screens/VaultScreen/components/ManageVaultItems";

const Stack = createStackNavigator<VaultStackParamList>();

export default (
  props: DrawerScreenProps<HomeDrawerParamList, "SafetyPlan">
) => {
  props.navigation.addListener("drawerOpen", (e) => {
    Keyboard.dismiss();
  });
  const { user } = props.route.params;

  return (
    <Stack.Navigator headerMode="none">
     <Stack.Screen component={Vault} initialParams={{user}} name='Vault'></Stack.Screen>
     <Stack.Screen component={ManageVaultItems} initialParams={{user}} name='Manage'></Stack.Screen>
    </Stack.Navigator>
  );
};
