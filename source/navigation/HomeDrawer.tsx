import React from "react";
import { View, StyleSheet } from "react-native";
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Avatar, Title, Drawer } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { User } from "../interfaces/User";
import { FirebaseController } from "../firebase/FirebaseController";
import { LifeLineBlue, LifeLineDarkBlue, LifeLineOrange } from "../types";

export default (props: {
  drawerProps: DrawerContentComponentProps;
  user: User;
}) => {
  // TODO: Not sure the point of using these variables like objects here
  const { user } = props;
  const { navigation } = props.drawerProps;

  const navigate = (route: string) => {
    navigation.navigate(route, { user });
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
        <Avatar.Icon color={'white'} style={{backgroundColor:LifeLineOrange}} icon='face'>
          

        </Avatar.Icon>

          <Title
            style={styles.title}
          >{`Hello ${user.firstName} ${user.lastName}!`}</Title>
          <View style={styles.row}></View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              navigation.navigate("Home", { user });
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="circle-edit-outline"
                color={color}
                size={size}
              />
            )}
            label="Information"
            onPress={() => {
              navigation.navigate("Information", { user });
            }}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="book" color={color} size={size} />
            )}
            label="Assessments"
            onPress={() => {
              navigate("Assessment");
            }}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="pill" color={color} size={size} />
            )}
            label="Medication"
            onPress={() => {
              navigate("Medication");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="doctor" color={color} size={size} />
            )}
            label="Appointments"
            onPress={() => {
              navigate("Appointments");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="human-greeting"
                color={color}
                size={size}
              />
            )}
            label="Safety Plan"
            onPress={() => {
              navigation.navigate("SafetyPlan", { screen: "Home" });
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="chat"
                color={color}
                size={size}
              />
            )}
            label="Daily Conversations"
            onPress={() => {
              navigation.navigate("DailyConversations");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="safe-square" color={color} size={size} />
            )}
            label="Vault"
            onPress={() => {
              navigation.navigate("Vault", { screen: "Vault" });
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            )}
            label="Settings"
            onPress={() => {
              navigation.navigate("Settings", { user });
            }}
          />
        </Drawer.Section>
        <Drawer.Section title="Logout">
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            )}
            label="Logout"
            onPress={async () => {
              await FirebaseController.Logout();
            }}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor:LifeLineBlue
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
