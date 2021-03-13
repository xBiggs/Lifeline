import { useNavigation } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafetyPlanStackParamList } from '../../../types';


export default (props: StackScreenProps<SafetyPlanStackParamList, 'EmergencyContact'>) => {
    const { user } = props.route.params
    const { navigation } = props

    useEffect(() => {
        navigation.addListener('blur', e => {
            navigation.goBack();
        })
    })
    return (
        <View>
            {/* {user.emergencyContacts ? <Text>List all emergency contacts and access contacts button</Text> : <Text>No emergeny contacts</Text>} */}
            <TouchableOpacity
            style={{
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#f2f2f2', height: 50, width: 50,
                borderRadius: 50, marginLeft: 350
            }}
            onPress={async() => {
                props.navigation.navigate("AccessDeviceContacts", { user });
              }}
            >
                <Text
                style={{justifyContent: 'center', alignItems: 'center', 
                marginBottom: 2, marginLeft: 1 , 
                color: 'blue' , fontSize:35}}
                >
                    +
                </Text>
            </TouchableOpacity>


            <TouchableOpacity style={{
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#51a4e8', height: 30,
                borderRadius: 15, width: 200,
                marginTop: 5, marginBottom: 15, marginLeft: 110
            }}
            // onPress={this.addToFirebase}
            >
                <Text style={{ fontSize: 20 }}>Call 911</Text>
            </TouchableOpacity>

        </View>

    )

}