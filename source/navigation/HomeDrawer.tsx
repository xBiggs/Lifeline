import React, { useState } from "react";
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
import { HomeDrawerParamList, LifeLineBlue, LifeLineDarkBlue, LifeLineOrange } from "../types";
import { Text } from "react-native-elements";

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

  const [currentScreen, setCurrentScreen] = useState("Home");

  const verifySetup = (): boolean | undefined => {
    if (!user.personalInfo) return false;
    else if (!user.mitigatingFactors || !user.riskFactors) return false;
    else return true;
  }



  const getCurrentScreen = (screen: string) => {
    return screen == currentScreen
  }



  return (
    <DrawerContentScrollView contentContainerStyle={{ flexGrow: 1 }} {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection:'row'}}>
          <Avatar.Icon color={'white'} style={{ backgroundColor: LifeLineDarkBlue,alignSelf:'center' }} icon='face'/>
          <Title style={styles.title}>{user.firstName} {user.lastName}</Title>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>

          <DrawerItem
            activeTintColor={LifeLineBlue}
            inactiveTintColor={'white'}

            focused={getCurrentScreen("Home")}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              setCurrentScreen("Home")
              navigation.navigate("Home", { user });
            }}

          />
          {
            verifySetup() ? <>
              <DrawerItem
                activeTintColor={LifeLineBlue}
                inactiveTintColor={'white'}
                focused={getCurrentScreen("Information")}
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="circle-edit-outline"
                    color={color}
                    size={size}
                  />
                )}
                label="Information"
                onPress={() => {
                  setCurrentScreen("Information")
                  navigation.navigate("Information", { user });
                }}
              />

              <DrawerItem
                activeTintColor={LifeLineBlue}
                inactiveTintColor={'white'}
                focused={getCurrentScreen("Assessment")}
                icon={({ color, size }) => (
                  <MaterialCommunityIcons name="book" color={color} size={size} />
                )}
                label="Assessments"
                onPress={() => {
                  setCurrentScreen("Assessment")
                  navigate("Assessment");
                }}
              />

              <DrawerItem
                activeTintColor={LifeLineBlue}
                inactiveTintColor={'white'}
                focused={getCurrentScreen("Medication")}
                icon={({ color, size, focused }) => (
                  <MaterialCommunityIcons name="pill" color={color} size={size} />
                )}
                label="Medication"
                onPress={() => {
                  setCurrentScreen("Medication")
                  navigate("Medication");
                }}
              />
              <DrawerItem
                activeTintColor={LifeLineBlue}
                inactiveTintColor={'white'}
                focused={getCurrentScreen("Appointments")}
                icon={({ color, size }) => (
                  <MaterialCommunityIcons name="doctor" color={color} size={size} />
                )}
                label="Appointments"
                onPress={() => {
                  setCurrentScreen("Appointments")
                  navigate("Appointments");
                }}
              />
              <DrawerItem
                activeTintColor={LifeLineBlue}
                inactiveTintColor={'white'}
                focused={getCurrentScreen("SafetyPlan")}
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="human-greeting"
                    color={color}
                    size={size}
                  />
                )}
                label="Safety Plan"
                onPress={() => {
                  setCurrentScreen("SafetyPlan")
                  navigation.navigate("SafetyPlan", { screen: "Home" });
                }}
              />
              <DrawerItem
                activeTintColor={LifeLineBlue}
                inactiveTintColor={'white'}
                focused={getCurrentScreen("DailyConversations")}
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="chat"
                    color={color}
                    size={size}
                  />
                )}
                label="Daily Conversations"
                onPress={() => {
                  setCurrentScreen("DailyConversations")
                  navigation.navigate("DailyConversations");
                }}
              />
              <DrawerItem
                activeTintColor={LifeLineBlue}
                inactiveTintColor={'white'}
                focused={getCurrentScreen("Vault")}
                icon={({ color, size }) => (
                  <MaterialCommunityIcons name="safe-square" color={color} size={size} />
                )}
                label="Vault"
                onPress={() => {
                  setCurrentScreen("Vault")
                  navigation.navigate("Vault", { screen: "Vault" });
                }}
              />
              <DrawerItem
                activeTintColor={LifeLineBlue}
                
                inactiveTintColor={'white'}
                focused={getCurrentScreen("Settings")}
                icon={({ color, size }) => (
                  <MaterialCommunityIcons name="cog" color={color} size={size} />
                )}
                label="Settings"
                onPress={() => {
                  setCurrentScreen("Settings")
                  navigation.navigate("Settings", { user });
                }}
              />

            </> : <><Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>Please complete To Do's on Home Screen to access application features</Text></>
          }
        </Drawer.Section>
        <Drawer.Section title="Logout">
          <DrawerItem
            activeTintColor={LifeLineBlue}
            inactiveTintColor={'white'}
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
    backgroundColor: LifeLineBlue,
  },
  userInfoSection: {
    paddingLeft: 20,
    flex:2,
    justifyContent:'center'
  },
  title: {
    color:"white",
    fontWeight: "bold",
    alignSelf:'center',
    marginLeft:10
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
    backgroundColor: LifeLineDarkBlue,
    marginTop: 15,
    flex: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
