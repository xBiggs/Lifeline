//AuthStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { UserStackParamList } from '../types';
import HomeDrawerNavigator from './HomeDrawerNavigator'
import { User } from '../interfaces/User';
/**
 * USAGE: USED TO NAVIGATE BETWEEN AUTH SCREENS FOR A UNAUTHORIZED USER
 */
const Stack = createStackNavigator<UserStackParamList>();

export default (props:{user:User})=>{
    return(
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Home' initialParams={{user:props.user}} component={HomeDrawerNavigator}></Stack.Screen>
        </Stack.Navigator>
    )
}