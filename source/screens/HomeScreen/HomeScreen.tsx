import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Screens } from "..";
import { Logout } from "../../firebase/auth";
import { User } from "../../interfaces/User";
import styles from "./styles";
import { Card, ListItem } from "react-native-elements";
import { Notification } from "../../interfaces/Notification";
import moment from "moment";

// borderRadius={15}
export default function HomeScreen(props: StackScreenProps<Screens, "Home">) {
  const user: User = props.route.params.user;

  var testDate = new Date();
  var notificationListTemp: Notification[] = [
    {
      date: new Date("March 7, 2021 23:15:30"),
      title: "Test2",
      information: "test2",
      actionScreen: "PersonalInfo",
      imageURL: require("./research.png"),
    },
    {
      date: testDate,
      title: "Test3",
      information: "test",
      actionScreen: "PersonalInfo",
      imageURL: require("./research.png"),
    },
  ];

  var notificationList: Notification[] = [];

  var index = 0;
  notificationListTemp.forEach((element) => {
    if (
      moment(element.date).isoWeek() == moment().isoWeek() &&
      !moment(element.date).isBefore(moment(), "day")
    ) {
      console.log("test");
      notificationList.push(element);
    }
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.buttonTitleMain}>
          Hello {`${user.firstName} ${user.lastName}`}
        </Text>

        <View>
          {notificationList.map((l, i) => (
            <Card containerStyle={{ borderRadius: 30 }}>
              <Card.Title style={{ color: "#FB8500", fontSize: 30 }}>
                {l.title} : {moment(l.date).format("MMM Do YY")}
              </Card.Title>
              <Card.Divider />

              <Card.Image
                style={{ resizeMode: "cover" }}
                source={l.imageURL}
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
                <Text style={styles.buttonLabel}>Edit Information</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  props.navigation.navigate("Assessment", { user });
                }}
              >
                <Text style={styles.buttonLabel}>Take Assessment</Text>
              </TouchableOpacity>
            </Card>
          ))}
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
