import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import SafetyPlanScreen from '../screens/SafetyPlanScreen/SafetyPlanScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import CopingStrategiesScreen from '../screens/SafetyPlanScreen/CopingStrategiesScreen/CopingStrategiesScreen';
import { User } from '../interfaces/User';
import { SafetyPlanStackParamList } from '../types';

const Stack = createStackNavigator<SafetyPlanStackParamList>();
export default (props:{user:User})=>(
    <Stack.Navigator>
        <Stack.Screen name='Home' initialParams={{user:props.user}} component={SafetyPlanScreen}></Stack.Screen>
        <Stack.Screen name='CopingStrategies' initialParams={{user:props.user}} component ={CopingStrategiesScreen}></Stack.Screen>
    </Stack.Navigator>
)
