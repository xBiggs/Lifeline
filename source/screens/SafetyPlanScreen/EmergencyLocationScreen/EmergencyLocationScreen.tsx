import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from 'react';
import { View, Text } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafetyPlanStackParamList } from "../../../types";
import { EmergencyLocationProvider } from '../../../interfaces/EmergencyLocationProvider'
import Accordian from 'react-native-vector-icons'
import { AddServiceProvider } from '../../../firebase/UserDataHandler'

export default (props: StackScreenProps<SafetyPlanStackParamList, 'EmergencyLocations'>) => {

    const user = props.route.params.user;

    const [_name, setName] = useState("");
    const [_vicinity, setVicinity] = useState("");
    const [_phone, setPhone] = useState("");
    const [_physicianName, setPhysicianName] = useState("");
    const [_serviceType, setServiceType] = useState("");
    const [_location, setLocation] = useState("");

    const [providerInfo, setProviderInfo] = useState<EmergencyLocationProvider>();

    const addProviderInfo = async () => {

        let servicesList = [];

        try {

            for (let item in user.emergencyProviders) {
                servicesList.push(item)
            }

            let provider: EmergencyLocationProvider = {
                name: _name,
                vicinity: _vicinity,
                phone: _phone,
                physicianName: _physicianName,
                serviceType: _serviceType,
                location: _location
            };

            servicesList.push(provider);
            user.emergencyProviders = servicesList
            console.log(servicesList);
            // console.log(user.emergencyProviders[6]);


        } catch (err) {
            throw (err as Error).message;
        }


        // setProviderInfo(provider);
        // // console.log(providerInfo);
        // user.emergencyProviders?.push(providerInfo);
        // console.log(user.emergencyProviders);


        // AddUserData(user);
    };

    return (
        <ScrollView>
            <View>
                <TextInput
                    style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                    onChangeText={(text) => setName(text)}
                    placeholder={"Service Provider Name"}
                />
                <TextInput
                    style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                    onChangeText={(text) => setVicinity(text)}
                    placeholder={"Service Provider Address"}
                />
                <TextInput
                    style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                    onChangeText={(text) => setPhone(text)}
                    placeholder={"Service Provider Phone"}
                />
                <TextInput
                    style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                    onChangeText={(text) => setPhysicianName(text)}
                    placeholder={"Your Physician's Name"}
                />
                <TextInput
                    style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                    onChangeText={(text) => setServiceType(text)}
                    placeholder={"Type of service"}
                />
                <TextInput
                    style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                    onChangeText={(text) => setLocation(text)}
                    placeholder={"Enter location coordinated seperated by a coma"}
                />


            </View>

            <View>
                <TouchableOpacity
                    style={{ marginLeft: 150, height: 50, width: 100, marginTop: 10, backgroundColor: "#40abed", borderRadius: 50 }}
                    onPress={() => addProviderInfo()}
                >

                    <Text
                        style={{ justifyContent: "center", alignContent: "center", marginLeft: 35, marginTop: 15 }}
                    >
                        Add
                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}