// EmergencyLocationScreen.tsx

import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafetyPlanStackParamList } from "../../../types";
import { EmergencyLocationProvider } from '../../../interfaces/EmergencyLocationProvider';
import { AddUserData } from '../../../firebase/UserDataHandler';
import EmergencyLocationCard from "./EmergencyLocationCard";


interface LocationProviderElement {
    id: string;
    locProvider: EmergencyLocationProvider;
}

export default (props: StackScreenProps<SafetyPlanStackParamList, 'EmergencyLocations'>) => {

    const { user } = props.route.params;

    // state property for location provider
    const [_name, setName] = useState("");
    const [_vicinity, setVicinity] = useState("");
    const [_phone, setPhone] = useState("");
    const [_physicianName, setPhysicianName] = useState("");
    const [_serviceType, setServiceType] = useState("");

    // const populateServiceList = () => {
    //     const list: EmergencyLocationProvider[] = [];
    //     if (user.emergencyProviders) {
    //         user.emergencyProviders.forEach((ele) => {
    //             list.push(ele);
    //         });
    //     }
    //     // console.log(list);
    //     return list;
    // };
    // const initialServiceList: EmergencyLocationProvider[] = populateServiceList()
    const [servicesList, setServiceList] = useState(user.emergencyProviders || []);



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

    const formatPhoneNumber = (phone: string) => {
        var cleaned = ('' + phone).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return "";
    }

    useEffect(() => {
        (async () => {
            user.emergencyProviders = servicesList;
            await AddUserData(user);

        })();

    }, [servicesList]);

    return (
        <ScrollView>
            <ScrollView>
                <View>
                    <TextInput
                        defaultValue={_name}
                        style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                        onChangeText={(text) => setName(text)}// onChangeVicinityName(text)}
                        // defaultValue={""}
                        placeholder={"Service Provider Name"}
                    />
                    <TextInput
                        defaultValue={_vicinity}
                        style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                        onChangeText={(text) => setVicinity(text)}
                        // defaultValue={_vicinity}
                        placeholder={"Service Provider Address"}
                    />
                    <TextInput
                        defaultValue={_phone}
                        style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                        onChangeText={(text) => setPhone(text)}
                        // defaultValue={_phone}
                        placeholder={"Service Provider Phone"}
                    />
                    <TextInput
                        defaultValue={_physicianName}
                        style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                        onChangeText={(text) => setPhysicianName(text)}
                        // defaultValue={_physicianName}
                        placeholder={"Your Physician's Name"}
                    />
                    <TextInput
                        defaultValue={_serviceType}
                        style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                        onChangeText={(text) => setServiceType(text)}
                        // defaultValue={_serviceType}
                        placeholder={"Type of service"}
                    />

                </View>

                <View>
                    <TouchableOpacity
                        style={{ marginLeft: 150, height: 50, width: 100, marginTop: 10, backgroundColor: "#40abed", borderRadius: 50 }}
                        onPress={async () => {

                            try {

                                let serviceExist = false;

                                if (_name.length == 0 || _phone.length == 0 || _physicianName.length == 0 || _vicinity.length == 0 || _serviceType.length == 0) {
                                    alert("One or more fields are empty");
                                    return;
                                } else if (_phone.length !== 10) {
                                    console.log(_phone)
                                    alert("Phone number should be exactly 10 digits.");
                                    return;
                                } else if (!Number(_phone)) {
                                    alert("Phone numbers should only contain digits.");
                                    return;
                                }


                                setPhone(formatPhoneNumber(_phone));
                                // console.log(formatPhoneNumber(_phone));
                                const service = _serviceType.charAt(0).toUpperCase() + _serviceType.slice(1);

                                let provider: EmergencyLocationProvider = {
                                    name: _name,
                                    vicinity: _vicinity,
                                    phone: formatPhoneNumber(_phone),
                                    physicianName: _physicianName,
                                    serviceType: service,
                                }


                                if (servicesList) {
                                    // console.log("servicesList NOT empty");
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

                                    } else {
                                        alert("Provider already exist!");
                                    }

                                }
                                else {
                                    // console.log("servicesList IS empty");
                                    var nList: EmergencyLocationProvider[] = [];
                                    nList.push(provider);
                                    setServiceList(nList);
                                    // console.log(servicesList);
                                }

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