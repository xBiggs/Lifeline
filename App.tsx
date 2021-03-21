import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from './source/firebase/config';
import { User } from './source/interfaces/User';
import { decode, encode } from 'base-64';
import { ActivityIndicator, LogBox, View } from 'react-native';
import UserStackNavigator from './source/navigation/UserStackNavigator';
import AuthStackNavigator from './source/navigation/AuthStackNavigator';
import { FirebaseController } from './source/firebase/FirebaseController';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

LogBox.ignoreLogs(["Setting a timer"])

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null);

  const userChanged = async (user: firebase.User | null) : Promise<void> => {

    const collectionRef = FirebaseController.GetCollectionRef();
    if (user) {
      console.log(`${user.email} is logged in`)
      const userData: User = (await collectionRef.doc(user.uid).get()).data() as User;
      if (userData) {
        setLoading(false)
        setUser(userData)
      }
    } else {
      console.log('user logged out')
      setLoading(false)
      //changed on logout to render login screen
      setUser(null)
    }
  }

  useEffect(() => {
    try {
      const userListener = firebase.auth().onAuthStateChanged(userChanged);
      return userListener;
    } catch (e) {
      alert( (e as Error).message );
    }
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
      { user? <UserStackNavigator user={user}></UserStackNavigator> : <AuthStackNavigator></AuthStackNavigator> }
    </NavigationContainer>
  );
}