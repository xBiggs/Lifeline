import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Button, Text, View } from 'react-native'
import { Screens } from '..';
import { Logout } from '../../firebase/auth'
import { User } from '../../interfaces/user';


export default function HomeScreen(props:StackScreenProps<Screens,'Home'>) {
    const user: User = props.route.params.user;
    return (
        <View>
            <Text>Hello {`${user.firstName} ${user.lastName}`}</Text>
            <Button
            title="Logout" onPress={async ()=>{await Logout();}}></Button>
            <Button
            title="Info Form" onPress={async ()=>{props.navigation.navigate('PersonalInfo',{user})}}></Button>
        </View>
    )
}