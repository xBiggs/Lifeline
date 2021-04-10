import { useNavigation } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafetyPlanStackParamList } from '../../../types';
import { ContactDetails } from "../../../interfaces/ContactDetails";
import _ from 'lodash';
import * as Contacts from 'expo-contacts';
import { GetAllUser } from '../../../firebase/UserDataHandler';
import { DemographicContacts } from '../../../interfaces/DemographicContacts';


export default (props: StackScreenProps<SafetyPlanStackParamList, 'EmergencyContact'>) => {
    const { user } = props.route.params
    // TODO: Variables never used
    const [contactsData, setContactsData] = useState<Contacts.Contact[]>();
    let [contactSuggestions, setContactSuggestions] = useState<DemographicContacts[]>();


    // useEffect(() => {
    //     navigation.addListener('blur', e => {
    //         navigation.goBack();
    //     })
    // })

    // useEffect(() => {
    //     (async () => {
    //         setContactSuggestions(await GetAllUser(user));
    //     })();
    // }, []);


    useEffect(() => {
        if (user.emergencyContacts) {
            setContactsData(cont => user.emergencyContacts);
        }
    }, [user.emergencyContacts]);


    const renderItem = ({ item }: { item: Contacts.Contact }) => (
        <View style={{ marginTop: 10, marginBottom: 50, marginLeft: 20, marginRight: 20 }}>
            <TouchableOpacity style={{
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#51a4e8', height: 50,
                borderRadius: 15, width: 300,
                marginTop: 5, marginBottom: 15, marginLeft: 40
            }}
            // onPress={}
            >
                <Text style={{ fontSize: 20 }}>Call {item.firstName} {item.lastName}</Text>
            </TouchableOpacity>
        </View >
    );

    return (
        <View>
            {/* {user.emergencyContacts ? <Text>List all emergency contacts and access contacts button</Text> : <Text>No emergeny contacts</Text>} */}
            <TouchableOpacity
                style={{
                    alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#f2f2f2', height: 50, width: 500,
                    borderRadius: 50, marginLeft: 130
                }}
                onPress={async () => {
                    setContactSuggestions(await GetAllUser(user));
                    if (contactSuggestions) {
                        let lst: DemographicContacts[] = []
                        contactSuggestions.forEach(element => {
                            if (element.persInfo) {
                                if ( element.persInfo.sexualOrientation == "Homosexual") {//user.personalInfo?.sexualOrientation /* && (Number(element.persInfo.age) <= Number(user.personalInfo?.age) + 50) */) {
                                    // console.log(element.persInfo.sexualOrientation);
                                    lst.push(element);
                                }
                            }
                        });
                        contactSuggestions = lst;
                        props.navigation.navigate("AccessDeviceContacts", { user, contactSuggestions });
                    }
                    // props.navigation.navigate("AccessDeviceContacts", { user,  contactSuggestions});
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
                marginTop: 5, marginBottom: 15, marginLeft: 110
            }}
            // onPress={this.addToFirebase}
            >
                <Text style={{ fontSize: 20 }}>Call 911</Text>
            </TouchableOpacity>
            <View style={{ borderWidth: 0.7, borderColor: 'black', margin: 10 }} />

            <FlatList
                // data={contactsData}
                data={user.emergencyContacts}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                    <View
                        // style={styles.flatListView}
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