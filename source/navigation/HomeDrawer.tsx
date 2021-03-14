import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { User } from '../interfaces/User';
import { Logout } from '../firebase/auth';

export default (props:{drawerProps:DrawerContentComponentProps,user:User})=> {


    const {user} = props
    const {navigation} = props.drawerProps

    const navigate= (route:string)=>{
        navigation.navigate(route,{user})
    }

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={
          styles.drawerContent
        }
      >
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri:
                'assets\icon.png://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
            size={50}
          />
          <Title style={styles.title}>{`Hello ${user.firstName} ${user.lastName}!`}</Title>
          <View style={styles.row}>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={size}
              />
            )}
            label="Home"
            onPress={() => {navigation.navigate('Home',{user})}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="circle-edit-outline" color={color} size={size} />
            )}
            label="Information"
            onPress={() => {navigation.navigate('Information',{user})}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="book"
                color={color}
                size={size}
              />
            )}
            label="Assessments"
            onPress={() => {navigate('Assessment')}}
          />
            <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="test-tube"
                color={color}
                size={size}
              />
            )}
            label="Medical"
            onPress={() => {navigate('Medical_Information')}}
          />
            <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="pill"
                color={color}
                size={size}
              />
            )}
            label="Medication"
            onPress={() => {navigate('Medication')}}
          />
            <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="doctor"
                color={color}
                size={size}
              />
            )}
            label="Appointments"
            onPress={() => {navigate('Appointments')}}
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

            onPress={() => {navigation.navigate('SafetyPlan',{screen:'Home'})}}
          />
          
        </Drawer.Section>
        <Drawer.Section title="Logout">
        <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="logout"
                color={color}
                size={size}
              />
            )}
            label="Logout"
            onPress={async() => {await Logout();}}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});