//AuthStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from '../types';
import { LoginScreen, SignupScreen } from '../screens';

/**
 * USAGE: USED TO NAVIGATE BETWEEN AUTH SCREENS FOR A UNAUTHORIZED USER
 */
const Stack = createStackNavigator<AuthStackParamList>();
export default ()=>{
    return(
        <Stack.Navigator
         screenOptions={{
             headerTitleAlign:'center'
         }}>
            <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
            <Stack.Screen name='Signup' component={SignupScreen}></Stack.Screen>
        </Stack.Navigator>
    )

    }
