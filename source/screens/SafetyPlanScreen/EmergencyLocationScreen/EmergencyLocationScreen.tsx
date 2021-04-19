// EmergencyLocationScreen.tsx

import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafetyPlanStackParamList } from "../../../types";
import { EmergencyLocationProvider } from '../../../interfaces/EmergencyLocationProvider';
import { AddUserData } from '../../../firebase/UserDataHandler';
import EmergencyLocationCard from "./EmergencyLocationCard";


// interface LocationProviderElement {
//     id: string;
//     locProvider: EmergencyLocationProvider;
// }

export default (props: StackScreenProps<SafetyPlanStackParamList, 'EmergencyLocations'>) => {

    const { user } = props.route.params;

    // state property for location provider
    const [_name, setName] = useState("");
    const [_vicinity, setVicinity] = useState("");
    const [_phone, setPhone] = useState("");
    const [_physicianName, setPhysicianName] = useState("");
    const [_serviceType, setServiceType] = useState("");

    const [servicesList, setServiceList] = useState(user.emergencyProviders || []);

    // removes emergency provider from state variable
    const removeProvider = async (item: EmergencyLocationProvider): Promise<void> => {

        try {
            if (servicesList) {
                const filteredList: EmergencyLocationProvider[] = servicesList.filter(
                    (ele) => ele.serviceType !== item.serviceType
                );
                setServiceList(filteredList);
            }
        } catch (err) {
            let er = (err as Error).message;
            alert(err);
        }
    };

    // formats phone number to keep consistency [ format: (xxx) xxx-xxxx ]
    const formatPhoneNumber = (phone: string) => {
        var cleaned = ('' + phone).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return "";
    }

    // keeps the firebase synced when a provider is added or removed
    useEffect(() => {
        (async () => {
            user.emergencyProviders = servicesList;
            await AddUserData(user);

        })();
    }, [servicesList]);

    return (
        <ScrollView>
            <ScrollView>
                {/* provider input fields */}
                <View>
                    <TextInput
                        defaultValue={_name}
                        style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                        onChangeText={(text) => setName(text)}
                        placeholder={"Service Provider Name"}
                    />
                    <TextInput
                        defaultValue={_vicinity}
                        style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                        onChangeText={(text) => setVicinity(text)}
                        placeholder={"Service Provider Address"}
                    />
                    <TextInput
                        defaultValue={_phone}
                        style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                        onChangeText={(text) => setPhone(text)}
                        placeholder={"Service Provider Phone"}
                    />
                    <TextInput
                        defaultValue={_physicianName}
                        style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                        onChangeText={(text) => setPhysicianName(text)}
                        placeholder={"Your Physician's Name"}
                    />
                    <TextInput
                        defaultValue={_serviceType}
                        style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                        onChangeText={(text) => setServiceType(text)}
                        placeholder={"Type of service"}
                    />

                </View>

                <View>
                    <TouchableOpacity
                        style={{ marginLeft: 150, height: 50, width: 100, marginTop: 10, backgroundColor: "#40abed", borderRadius: 50 }}
                        onPress={async () => {
                            try {
                                let serviceExist = false; // variable to keep track of wheather a provider already exist or not 

                                // checks if the fields are empty
                                if (_name.length == 0 || _phone.length == 0 || _physicianName.length == 0 || _vicinity.length == 0 || _serviceType.length == 0) {
                                    alert("One or more fields are empty");
                                    return;
                                }
                                if (_phone.length !== 10) { // checks if the phone number has 10 digits to satisfy formating requirements mentioned above
                                    console.log(_phone)
                                    alert("Phone number should be exactly 10 digits.");
                                    return;
                                }
                                if (!Number(_phone)) { // checks if the phone number only contains non-digits
                                    alert("Phone numbers should only contain digits.");
                                    return;
                                }
                                setPhone(formatPhoneNumber(_phone)); // formats the phone number

                                // formats the service provider to make the first character of the string upper cased for visual pleasing purposes
                                const service = _serviceType.charAt(0).toUpperCase() + _serviceType.slice(1);
                                
                                // creating an interface object with the user input data
                                let provider: EmergencyLocationProvider = {
                                    name: _name,
                                    vicinity: _vicinity,
                                    phone: formatPhoneNumber(_phone),
                                    physicianName: _physicianName,
                                    serviceType: service,
                                }
                                if (servicesList) { // check if the serviceList state variable is empty or undefined
                                    var nList: EmergencyLocationProvider[] = [];
                                    servicesList.forEach(element => {
                                        if (element.serviceType?.toLowerCase() === provider.serviceType?.toLowerCase()) {
                                            serviceExist = true;
                                        }
                                    });
                                    if (!serviceExist) {
                                        servicesList.forEach(ele => {
                                            nList.push(ele);
                                        });
                                        nList.push(provider);
                                        setServiceList(nList);
                                    } else { // if the service already exist alet the user
                                        alert("Provider already exist!");
                                    }
                                }
                                else { // if serviceList state variable is empty, add the provider the user entered to a temporary array and assign the temporary array to the state variable
                                    var nList: EmergencyLocationProvider[] = [];
                                    nList.push(provider);
                                    setServiceList(nList);
                                }

                                // clear the text input fields
                                setServiceType("");
                                setName("");
                                setPhone("");
                                setPhysicianName("");
                                setVicinity("");

                            } catch (err) {
                                throw (err as Error).message;
                            }

                        }}
                    >

                        <Text
                            style={{ justifyContent: "center", alignContent: "center", marginLeft: 35, marginTop: 15 }}
                        >
                            Add
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View>
                {
                    servicesList.length == 0 ? <></> :
                        <>
                            {servicesList.map(ele => {
                                return <EmergencyLocationCard key={servicesList.indexOf(ele)}
                                    locationProvider={ele}
                                    onPressTrash={() => {
                                        // console.log("BEFORE DELETING", user.emergencyProviders);
                                        removeProvider(ele);
                                        // console.log("AFTER DELETING", user.emergencyProviders);
                                    }}
                                />
                            })}


                        </>
                }
            </View>


        </ScrollView>

    );
}