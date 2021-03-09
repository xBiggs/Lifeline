import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import SafetyPlanScreen from '../screens/SafetyPlanScreen/SafetyPlanScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import CopingStrategiesScreen from '../screens/SafetyPlanScreen/CopingStrategiesScreen/CopingStrategiesScreen';
import { User } from '../interfaces/User';
import { HomeDrawerParamList, SafetyPlanStackParamList } from '../types';
import ContactAccessScreen from '../screens/ContactScreen/ContactAccessScreen';
import { DrawerScreenProps } from '@react-navigation/drawer';

const Stack = createStackNavigator<SafetyPlanStackParamList>();
export default (props:DrawerScreenProps<HomeDrawerParamList,'SafetyPlan'>)=>{
    const {user} = props.route.params;
    return (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name='Home' initialParams={{user}} component={SafetyPlanScreen}></Stack.Screen>
        <Stack.Screen name='CopingStrategies' initialParams={{user}} component ={CopingStrategiesScreen}></Stack.Screen>
        <Stack.Screen name='EmergencyContact' initialParams={{user}} component ={ContactAccessScreen}></Stack.Screen>
    </Stack.Navigator>
    )
}
