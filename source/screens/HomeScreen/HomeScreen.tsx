import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { FirebaseController } from "../../firebase/FirebaseController";
import { User } from "../../interfaces/User";
import styles from "./styles";
import { Card, Icon } from "react-native-elements";
import { NotificationType } from "../../interfaces/Notification";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { HomeDrawerParamList } from "../../types";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../Controllers/notificationsController";

import moment from "moment";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen(
  props: DrawerScreenProps<HomeDrawerParamList, "Home">
) {
  if (
    !props.route.params.user.personalInfo ||
    !props.route.params.user.riskFactors ||
    !props.route.params.user.mitigatingFactors
  )
    return (
      <View style={styles.container}>
        <StatusBar></StatusBar>
        <Text
          style={{
            textAlign: "center",
            alignSelf: "center",
            color: "white",
            fontSize: 25,
          }}
        >
          To Do:
        </Text>
        {!props.route.params.user.personalInfo && (
          <TouchableOpacity
            style={{
              backgroundColor: "#023047",
              marginLeft: 0,
              marginRight: 0,
              marginTop: 20,
              height: 48,
              alignSelf: "stretch",
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={async () => {
              props.navigation.navigate("Information", {
                user: props.route.params.user,
              });
            }}
          >
            <Text style={styles.buttonLabel}>Enter Personal Information</Text>
          </TouchableOpacity>
        )}
        {(!props.route.params.user.riskFactors ||
          !props.route.params.user.mitigatingFactors) && (
          <TouchableOpacity
            style={{
              backgroundColor: "#023047",
              marginLeft: 0,
              marginRight: 0,
              marginTop: 20,
              height: 48,
              alignSelf: "stretch",
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={async () => {
              if (!props.route.params.user.personalInfo) {
                alert(
                  "Please provide personal information before taking assessment"
                );
              } else
                props.navigation.navigate("Assessment", {
                  user: props.route.params.user,
                });
            }}
          >
            <Text style={styles.buttonLabel}>Take Assessment</Text>
          </TouchableOpacity>
        )}
      </View>
    );

  // TODO: Variables are never used
  
  const user: User = props.route.params.user;

  let testDate = new Date();
  let notificationList: NotificationType[] = [];

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
  // console.log("==============");
  // console.log(userNotifications);

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
                  onPress={ () => {
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
