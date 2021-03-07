//AuthStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from '../types';
import { LoginScreen } from '../screens';

/**
 * USAGE: USED TO NAVIGATE BETWEEN AUTH SCREENS FOR A UNAUTHORIZED USER
 */
const Stack = createStackNavigator<AuthStackParamList>();
export default ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
            <Stack.Screen name='Signup' component={LoginScreen}></Stack.Screen>
        </Stack.Navigator>
    )

    }
