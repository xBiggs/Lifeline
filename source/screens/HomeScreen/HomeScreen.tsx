import React, { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { FirebaseController } from "../../firebase/FirebaseController";
import { User } from "../../interfaces/User";
import styles from "./styles";
import { Card } from "react-native-elements";
import { NotificationType } from "../../interfaces/Notification";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { HomeDrawerParamList } from "../../types";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../Controllers/notificationsController";
// This import takes up a lot of space, try to be more specific on imports if possible
import moment from "moment";

Notifications.setNotificationHandler({
  // TODO: What is the point of async here?
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
  // TODO: Variables are never used
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
      // FIXME: ERROR
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
          // FIXME: ERROR
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
              // FIXME: ERROR
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
          // FIXME: ERROR
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
              // FIXME: ERROR
        notificationListener.current
      );
            // FIXME: ERROR
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const user: User = props.route.params.user;

  // TODO: Stop using var
  var testDate = new Date();
  var notificationList: NotificationType[] = [];


  // TODO: What if notification is null?
  const userNotifications: NotificationType[] = user.notifications;

  // TODO: Stop using var
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

  const windowWidth = Dimensions.get("window").width;
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.buttonTitleMain}>
          Hello {`${user.firstName} ${user.lastName}`}
        </Text>

        <View>
          {notificationList.length ? (
            notificationList.map((l, i) => (
              <Card
                key={i}
                containerStyle={{
                  borderRadius: 30,
                  width: windowWidth * 0.9,
                }}
              >
                <Card.Title style={{ color: "#FB8500", fontSize: 25 }}>
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
                    fontSize: 15,
                  }}
                >
                  {l.information}
                </Text>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FB8500",
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: 20,
                    height: 48,
                    width: windowWidth * 0.8,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={async () => {
                    // FIXME: Error
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
          style={{
            backgroundColor: "#023047",
            marginLeft: 0,
            marginRight: 0,
            marginTop: 20,
            height: 48,
            width: windowWidth * 0.9,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={async () => {
            await FirebaseController.Logout();
          }}
        >
          <Text style={styles.buttonLabel}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
