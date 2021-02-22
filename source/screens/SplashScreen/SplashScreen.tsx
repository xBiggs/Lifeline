import React from 'react'
import { useEffect } from "react";
import { View } from "react-native"
import firebase from "../../firebase/config"
import { StackScreenProps } from '@react-navigation/stack';
import { User } from '../../interfaces/user';
import { Lifeline } from '../../../types';


export default function SplashScreen(props: StackScreenProps<Lifeline.RouteList, 'Splash'>) {
    const navigation = props.navigation;
    useEffect(() => {

        const isLoggedIn = async () => {
            firebase.auth().onAuthStateChanged(async authUser => {
                console.log('user changed');
                if (authUser) {
                    const user = (await firebase.firestore().collection('users').doc(authUser.uid).get()).data() as User;

                    if (user) {
                        navigation.replace('Home', user)
                    }

                }
                else {
                    navigation.replace('Login')
                }
            })

        }


        isLoggedIn();

    }, [])

    return (
        <View>
        </View>
    )

}
