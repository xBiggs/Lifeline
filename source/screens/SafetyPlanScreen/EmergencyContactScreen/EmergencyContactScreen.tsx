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
import EmergencyContactCard from "./EmergencyContactCard";
import { AddUserData } from '../../../firebase/UserDataHandler';


export default (props: StackScreenProps<SafetyPlanStackParamList, 'EmergencyContact'>) => {
    const { user } = props.route.params

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

    const deleteContact = async (item: ContactDetails): Promise<void> => {

        try {
            if (contactsData) {
                const filteredList: ContactDetails[] = contactsData.filter(
                    (ele) => ele.digits !== item.digits
                );
                user.emergencyContacts = filteredList;
                setContactsData(filteredList);
            }
        } catch (err) {
            let er = (err as Error).message;
            alert(err);
        }
    };

    useEffect(() => {
        (async () => {
            user.emergencyContacts = contactsData;
            await AddUserData(user);
        })();
    }, [contactsData])

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

    return (
        <ScrollView>
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

                <View style={{ borderWidth: 0.7, borderColor: 'black', margin: 10, flex: 1 }} />

                {
                    contactsData.length == 0 ? <></> :
                        <>
                            {contactsData.map(ele => {
                                return <EmergencyContactCard key={contactsData.indexOf(ele)}
                                    emergencyContact={ele}
                                    onPressDelete={()=>{
                                        if(ele.digits) { deleteContact(ele)}
                                    }}
                                    onPressCall={() => {
                                        if (ele.digits) { dialNumber(ele.digits.toString()); }
                                    }}
                                />
                            })}


                        </>
                }
            </View>
        </ScrollView>
    )

}