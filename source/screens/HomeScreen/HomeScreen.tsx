import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
  Platform,
  Button,
} from "react-native";
import { Screens } from "..";
import { getCurrentUserInfo, GetUserData, Logout } from "../../firebase/auth";
import { User } from "../../interfaces/User";
import styles from "./styles";
import { Card, ListItem } from "react-native-elements";
import { NotificationType } from "../../interfaces/Notification";
import moment from "moment";
import useFormal from "@kevinwolf/formal-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { HomeDrawerParamList } from "../../types";
import Constants from "expo-constants";

import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../Controllers/notificationsController";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// borderRadius={15}
export default function HomeScreen(
  props: DrawerScreenProps<HomeDrawerParamList, "Home">
) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  //State Variables //////////
  // const [userNotifications, setUserNotifications] = useState<
  //   NotificationType[]
  // >();

  // useEffect(() => {
  //   const getinfo = async () => {
  //     const data: any = await getCurrentUserInfo();
  //     if (data.notifications) setUserNotifications(data.notifications);
  //     else setUserNotifications([]);

  //     return data;
  //   };
  //   getinfo();
  // }, []);
  //////////////////////////

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const user: User = props.route.params.user;

  var testDate = new Date();

  var notificationList: NotificationType[] = [];
  const userNotifications: NotificationType[] = user.notifications;
  var index = 0;
  var imageList: typeof Image[] = [];
  userNotifications?.forEach((element: any) => {
    var tempDate: Date = element.date.toDate();
    if (
      moment(tempDate).isoWeek() == moment().isoWeek() &&
      !moment(tempDate).isBefore(moment(), "day")
    ) {
      notificationList.push(element);
      imageList.push(require("./research.png"));
    }
  });
  console.log("==============");
  console.log(userNotifications);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.buttonTitleMain}>
          Hello {`${user.firstName} ${user.lastName}`}
        </Text>

        <View>
          {notificationList.length ? (
            notificationList.map((l, i) => (
              <Card containerStyle={{ borderRadius: 30 }}>
                <Card.Title style={{ color: "#FB8500", fontSize: 30 }}>
                  {l.title} {moment(l.date.toDate()).format("MMM Do YY")}
                </Card.Title>
                <Card.Divider />

                <Card.Image
                  style={{ resizeMode: "cover" }}
                  source={
                    imageList[i] ? imageList[i] : require("./research.png")
                  }
                ></Card.Image>
                <Text
                  style={{
                    marginBottom: 20,
                    marginTop: 40,
                    paddingLeft: 20,
                    paddingRight: 20,
                    fontSize: 20,
                  }}
                >
                  {l.information}
                </Text>

                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    props.navigation.navigate(l.actionScreen, {
                      user,
                    });
                  }}
                >
                  <Text style={styles.buttonLabel}>{l.actionScreenTitle}</Text>
                </TouchableOpacity>
              </Card>
            ))
          ) : (
            <Text style={styles.buttonTitle}>No New Notifications</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.buttonLogout}
          onPress={async () => {
            await Logout();
          }}
        >
          <Text style={styles.buttonLabel}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
