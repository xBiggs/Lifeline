import {Lifeline} from './types';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, SignupScreen } from './source/screens';
import {decode, encode} from 'base-64';
import SplashScreen from './source/screens/SplashScreen/SplashScreen';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator<Lifeline.RouteList>();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen name='Splash' component={SplashScreen}></Stack.Screen>
       <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
       <Stack.Screen name='Signup' component={SignupScreen}></Stack.Screen>
       <Stack.Screen name ='Home' component={HomeScreen} options={
         ({route})=>({
           title:`Hello ${route.params.firstName} ${route.params.lastName} !`
         })
       }></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}