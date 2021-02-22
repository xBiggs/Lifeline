
import { useNavigation } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Button, Text, View } from 'react-native'
import { Logout } from '../../firebase/auth';




export default function HomeScreen(props: StackScreenProps<RouteList,'Home'>) {
    const user = props.route.params;
    console.log(user);
    const navigation = props.navigation;
    return (
        <View>
            
            <Text>{user.name}</Text>
               
            
            <Button
            title="Logout"
            onPress={
                async()=>{
                    await Logout();
                    navigation.replace('Login')
                }
            }></Button>
        </View>
    )
}