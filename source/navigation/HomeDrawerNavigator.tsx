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
import { registerForPushNotificationsAsync } from "../Controllers/notificationsController";
import { Subscription } from '@unimodules/core';

/**
 * USAGE: USED TO NAVIGATE BETWEEN AUTH SCREENS FOR A UNAUTHORIZED USER
 */
const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export default (props: StackScreenProps<UserStackParamList, "Home">) => {

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<Notifications.Notification>();

  const notificationListener= useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    (async () => {
     try {
        //console.log('token')
        const token = await registerForPushNotificationsAsync();
     //  if(token) setExpoPushToken(token);
      } catch(e) {
        alert("Failed to register for push notifications, please try again");
        }
/*
      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(
        (notification) => {
        //  console.log('setting notification')
       //   setNotification(notification);
        }
      );
*/
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          switch (response.notification.request.content.data.data) {
            case "DailyConversations":
              props.navigation.navigate("DailyConversations", { user });
            
              break;
            case "MedicationScreen":
              props.navigation.navigate("Medication", { user });
              break;
            case "Vault":
              props.navigation.navigate("Vault", { user });
              break;
          }
        }
      );

      return () => {
        if (notificationListener && notificationListener.current) {
          console.log("in if statement")
          Notifications.removeNotificationSubscription(notificationListener.current);
        }
        if (responseListener && responseListener.current) {
          Notifications.removeNotificationSubscription(responseListener.current);
        }
      }
    })();
  }, []);

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