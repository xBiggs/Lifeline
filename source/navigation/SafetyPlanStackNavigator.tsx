import React, { useEffect } from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import SafetyPlanScreen from '../screens/SafetyPlanScreen/SafetyPlanScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import CopingStrategiesScreen from '../screens/SafetyPlanScreen/CopingStrategiesScreen/CopingStrategiesScreen';
import { User } from '../interfaces/User';
import { HomeDrawerParamList, SafetyPlanStackParamList } from '../types';
// import ContactAccessScreen from '../screens/ContactScreen/ContactAccessScreen';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Keyboard } from 'react-native';
import ContactAccessForm from '../Forms/ContactAccessForm';
import EmergencyContactScreen from '../screens/SafetyPlanScreen/EmergencyContactScreen/EmergencyContactScreen';
import SocialEngagementsScreen from '../screens/SafetyPlanScreen/SocialEngagementsScreen/';
import WarningSignsScreen from '../screens/SafetyPlanScreen/WarningSignsScreen/WarningSignsScreen';

const Stack = createStackNavigator<SafetyPlanStackParamList>();

export default (props:DrawerScreenProps<HomeDrawerParamList,'SafetyPlan'>)=>{
    props.navigation.addListener('drawerOpen',e=>{Keyboard.dismiss()})
    const {user} = props.route.params;

    return (
        <Stack.Navigator headerMode='none'>
        <Stack.Screen name='Home' initialParams={{ user }} component={SafetyPlanScreen}></Stack.Screen>
        <Stack.Screen name='CopingStrategies' initialParams={{ user }} component={CopingStrategiesScreen}></Stack.Screen>
        <Stack.Screen name='EmergencyContact' initialParams={{user}} component ={EmergencyContactScreen}></Stack.Screen>
        <Stack.Screen name='AccessDeviceContacts' initialParams={{user}} component ={ContactAccessForm}></Stack.Screen>
        <Stack.Screen name='SocialEngagements' initialParams={{user}} component={SocialEngagementsScreen}></Stack.Screen>
        <Stack.Screen name="WarningSigns" initialParams={{ user }} component={WarningSignsScreen}></Stack.Screen>
        {/* <Stack.Screen name='CallContactAccessFormComponent' initialParams={{user}} component ={ContactAccessScreen}></Stack.Screen> */}
    </Stack.Navigator>
    )
}
