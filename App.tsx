import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './source/firebase/config';
import { LoginScreen, HomeScreen, SignupScreen, Screens, PersonalInfoScreen } from './source/screens';
import { User } from './source/interfaces/User';
import { decode, encode } from 'base-64';
import { ActivityIndicator, LogBox, Text, View } from 'react-native';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator<Screens>();
//LogBox.ignoreLogs(["Setting a timer"])

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null);

  const userChanged = async (user: firebase.User | null) => {

    const usersRef = firebase.firestore().collection('users');
    if (user) {
      const userData: User = (await usersRef.doc(user.uid).get()).data() as User;
      if (userData) {
        setLoading(false)
        setUser(userData)
      }
    } else {
      setLoading(false)
      //changed on logout to render login screen
      setUser(null)
    }
  }

  useEffect(() => {
    const userListener = firebase.auth().onAuthStateChanged(userChanged);
   return userListener;
  }, [])

  // shows loading indicator while checking for auth
  if (loading) {
    return (
      <View>
        <ActivityIndicator></ActivityIndicator>
      </View>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
          <Stack.Screen name="Home"  component={HomeScreen} initialParams={{user}}></Stack.Screen>
          <Stack.Screen name='PersonalInfo' component={PersonalInfoScreen} initialParams={{user}}></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}