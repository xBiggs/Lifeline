// EmergencyLocationScreen.tsx

import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafetyPlanStackParamList } from "../../../types";
import { EmergencyLocationProvider } from '../../../interfaces/EmergencyLocationProvider';
import Accordian from 'react-native-vector-icons';
import { AddServiceProvider } from '../../../firebase/UserDataHandler';
import EmergencyLocationCard from "./EmergencyLocationCard";
import { Guid } from "guid-typescript";
import { getPresentedNotificationsAsync } from "expo-notifications";
import { render } from "react-dom";


interface LocationProviderElement {
    id: string;
    locProvider: EmergencyLocationProvider;
}

export default (props: StackScreenProps<SafetyPlanStackParamList, 'EmergencyLocations'>) => {

    const { user } = props.route.params;

    const [_name, setName] = useState("");
    const [_vicinity, setVicinity] = useState("");
    const [_phone, setPhone] = useState("");
    const [_physicianName, setPhysicianName] = useState("");
    const [_serviceType, setServiceType] = useState("");

    const [placesPrediction, setPlacePrediction] = useState([]);
    
    const populateServiceList = () => {
        const list: EmergencyLocationProvider[] = [];
        if (user.emergencyProviders) {
          user.emergencyProviders.forEach((ele) => {
            list.push(ele);
          });
        }
        // console.log(list);
        return list;
      };
    const initialServiceList: EmergencyLocationProvider[] = populateServiceList()
    const [servicesList, setServiceList] = useState(initialServiceList);

    

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

    // useEffect(() => {
    //     // var term = searchTerm.split(' ').join('+')
    //     var term = _name.split(' ').join('+')

    //     setName(term.toLowerCase());
    //     // console.log(searchTerm);
    // }, [_name])

    // const getUrl = (): string => {

    //     const domain = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
    //     const location = `&location=${user.location}`;
    //     const input = `&input=${_name}`
    //     const radius = '&radius=2000';
    //     const key = '&key=AIzaSyDh4-cp0UHt7qioUoPCh8zwVyA8JdmTxvs';//getApiKey;
    //     const url = domain + key + input + location + radius;
    //     // console.log(url);

    //     return url;
    // }
    

    // const onChangeVicinityName = async (text: string) => {
    //     try {
    //         if (text.length != 0) {
    //             setName(text);
    //             const url = getUrl();

    //             const result = await (await fetch(url)).json();
    //             // console.log(result.predictions[0].description);
    //             setPlacePrediction(result.predictions)
    //         }
    //     } catch (e) {
    //         throw (e as Error).message;
    //     }
    // }

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
            await AddServiceProvider(user);
            
        })();

    }, [servicesList]);

    return (
        <View>
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
                    defaultValue= {_physicianName}
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

                                let provider: EmergencyLocationProvider = {
                                    name: _name,
                                    vicinity: _vicinity,
                                    phone: formatPhoneNumber(_phone),
                                    physicianName: _physicianName,
                                    serviceType: _serviceType
                                }

                                
                                if (servicesList) {
                                    // console.log("servicesList NOT empty");
                                    var nList: EmergencyLocationProvider[] = [];
                                    servicesList.forEach(element => {
                                        if (element.serviceType == provider.serviceType) {
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

            <ScrollView>
                <View>
                    {
                        servicesList.length==0?<></> :
                        <>
                        {servicesList.map(ele=>{
                            return   <EmergencyLocationCard key={servicesList.indexOf(ele)}
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


{/*
                    <FlatList
                        data={servicesList}
                        // extraData={servicesList}
                        renderItem={(ele) => (
                            <EmergencyLocationCard
                                locationProvider={ele.item}
                                onPressTrash={() => {
                                    // console.log("BEFORE DELETING", user.emergencyProviders);
                                    removeProvider(ele.item);
                                    // console.log("AFTER DELETING", user.emergencyProviders);
                                }}
                            />
                        )}
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
                                <Text style={{ color: 'blue' }}>No Services Listed</Text>

                            </View>

                        )}
                    />
                            */}
                </View>
            </ScrollView>


        </View>

    );
}