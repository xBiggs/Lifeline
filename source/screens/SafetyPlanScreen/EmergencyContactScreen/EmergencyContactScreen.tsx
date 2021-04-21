import { useNavigation } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { View, Text, Linking, Platform, ScrollView } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafetyPlanStackParamList } from '../../../types';
import { ContactDetails } from "../../../interfaces/ContactDetails";
import _ from 'lodash';
import * as WebBrowser from 'expo-web-browser';
import { useFocusEffect } from '@react-navigation/native';


export default (props: StackScreenProps<SafetyPlanStackParamList, 'EmergencyContact'>) => {
    const { user } = props.route.params
    // state variable that holds emergency contacts
    const [contactsData, setContactsData] = useState(user.emergencyContacts || []);

    // renders emergency contacts when updated
    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                try {
                    if (user.emergencyContacts) setContactsData(user.emergencyContacts);
                } catch (err) {
                    throw (err as Error).message;
                }
            })();
            if (user.emergencyContacts) setContactsData(user.emergencyContacts)
        }, [user.emergencyContacts])
    );

    // Dials the number (passed in as argument) on device's dial pad
    const dialNumber = (num: string) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { // checks which OS the app is running on an converts it to the appropriate url
            phoneNumber = `tel:${num}`;
        }
        else {
            phoneNumber = `telprompt:${num}`;
        }
        Linking.openURL(phoneNumber); // opens the dial pad with passed in url
    };

    // renders emergency contact
    const renderItem = ({ item }: { item: ContactDetails }) => (
        <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
            <TouchableOpacity style={{
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#51a4e8', height: 50,
                borderRadius: 15, width: 300,
                marginTop: 5, marginBottom: 15, marginLeft: 40
            }}
                onPress={() => { // on user press event it calls dialNumber function
                    if (item.digits) { // checks if this contact has a number or is undefined
                        dialNumber(item.digits + '');
                    }
                    else { // unlikely event of the user does not have a number or is undefined, it displays an alert
                        alert("This person has no number");
                    }
                }}
            >
                <Text style={{ fontSize: 20 }}>Call {item.firstName} {item.lastName}</Text>
            </TouchableOpacity>
        </View >
    );

    return (
        <View>
            {/* Call sthe form which access device's contacts */}
            <TouchableOpacity
                style={{
                    alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#f2f2f2', height: 50, width: 500,
                    borderRadius: 50, marginLeft: 130
                }}
                onPress={() => {
                    props.navigation.navigate("AccessDeviceContacts", { user });
                }}
            >
                <Text
                    style={{
                        justifyContent: 'center', alignItems: 'center',
                        marginBottom: 2, marginLeft: 1,
                        color: 'blue', fontSize: 35
                    }}
                >
                    +
                </Text>

            </TouchableOpacity>


            <TouchableOpacity style={{
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#e64c4c', height: 30,
                borderRadius: 15, width: 200,
                marginTop: 5, marginBottom: 10, marginLeft: 110
            }}
                onPress={() => {
                    dialNumber("911");
                }}
            >
                <Text style={{ fontSize: 20 }}>Call 911</Text>
            </TouchableOpacity>
            <View style={{ borderWidth: 0.7, borderColor: 'black', margin: 10 }} />

            <TouchableOpacity style={{
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#e64c4c', height: 30,
                borderRadius: 15, width: 200,
                marginTop: 5, marginBottom: 10, marginLeft: 110
            }}
                onPress={() => {
                    dialNumber("(888) 843-4564");
                }}
            >
                <Text style={{ fontSize: 20 }}>LGBT National Hotline</Text>
            </TouchableOpacity>
            <View style={{ borderWidth: 0.7, borderColor: 'black', margin: 10 }} />

            <TouchableOpacity style={{
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#e64c4c', height: 30,
                borderRadius: 15, width: 200,
                marginTop: 5, marginBottom: 10, marginLeft: 110
            }}
                onPress={async () => {
                    await WebBrowser.openBrowserAsync('https://rainbowmobile.org/community-resources/hotlines/');
                }}
            >
                <Text style={{ fontSize: 20 }}>Other hotline</Text>
            </TouchableOpacity>
            <View style={{ borderWidth: 0.7, borderColor: 'black', margin: 10 }} />

            <FlatList
                data={contactsData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 50
                        }}
                    >
                        <Text style={{ color: 'blue' }}>No Contacts Found</Text>
                    </View>

                )}
            />
        </View>

    )

}