import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafetyPlanStackParamList } from "../../../types";
import { EmergencyLocationProvider } from '../../../interfaces/EmergencyLocationProvider';
import Accordian from 'react-native-vector-icons'
import { AddServiceProvider } from '../../../firebase/UserDataHandler'

export default (props: StackScreenProps<SafetyPlanStackParamList, 'EmergencyLocations'>) => {

    const { user } = props.route.params;

    const [_name, setName] = useState("");
    const [_vicinity, setVicinity] = useState("");
    const [_phone, setPhone] = useState("");
    const [_physicianName, setPhysicianName] = useState("");
    const [_serviceType, setServiceType] = useState("");

    const [servicesList, setServiceList] = useState<EmergencyLocationProvider[]>();


    const renderItem = ({ item }: { item: EmergencyLocationProvider }) => (
        <View style={{marginTop:10, marginBottom: 50, marginLeft: 20, marginRight: 20}}>
          {/* <Text style={styles.renderItemText}>
            {item.firstName + ' '}
            {item.lastName}
          </Text> */}
          {/* <Text style={{ color: '#79c96d', fontWeight: 'bold' }}>
                    {item.phoneNumbers[0].digits}
                </Text> */}
          {/* <Button title="+ Add" onPress={() => { console.log(item.phoneNumbers[0].number) }} />  */}
          {/* style={{ alignItems: 'center', justifyContent: 'center' }} */}
          <TouchableOpacity style={{
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#51a4e8', height: 50,
            borderRadius: 15, width: 300,
            marginTop: 5, marginBottom: 15, marginLeft: 40
          }}
            // onPress={}
          >
            <Text style={{ fontSize: 20 }}>Call {item.name} {item.vicinity}</Text>
          </TouchableOpacity>
        </View >
      );
    

    return (
        <ScrollView>
            <View>
                <TextInput
                    style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                    onChangeText={(text) => setName(text)}
                    defaultValue={_name}
                    placeholder={"Service Provider Name"}
                />
                <TextInput
                    style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                    onChangeText={(text) => setVicinity(text)}
                    defaultValue={_vicinity}
                    placeholder={"Service Provider Address"}
                />
                <TextInput
                    style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                    onChangeText={(text) => setPhone(text)}
                    defaultValue={_phone}
                    placeholder={"Service Provider Phone"}
                />
                <TextInput
                    style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                    onChangeText={(text) => setPhysicianName(text)}
                    defaultValue={_physicianName}
                    placeholder={"Your Physician's Name"}
                />
                <TextInput
                    style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
                    onChangeText={(text) => setServiceType(text)}
                    defaultValue={_serviceType}
                    placeholder={"Type of service"}
                />
                
            </View>

            <View>
                <TouchableOpacity
                    style={{ marginLeft: 150, height: 50, width: 100, marginTop: 10, backgroundColor: "#40abed", borderRadius: 50 }}
                    onPress={async () => {
                        
                        let provider: EmergencyLocationProvider = {
                            name: _name,
                            vicinity: _vicinity,
                            phone: _phone,
                            physicianName: _physicianName,
                            serviceType: _serviceType
                        }

                        if(user.emergencyProviders){ user.emergencyProviders.push(provider) }
                        else {
                            user.emergencyProviders = [];
                            user.emergencyProviders.push(provider);
                        }
                        console.log(user.emergencyProviders);
                        
                        await AddServiceProvider(user);//, provider);

                        
                    }}//addProviderInfo()}
                >

                    <Text
                        style={{ justifyContent: "center", alignContent: "center", marginLeft: 35, marginTop: 15 }}
                    >
                        Add
                    </Text>
                </TouchableOpacity>
            </View>

            {/* <FlatList
                // data={contactsData}
                data={user.emergencyProviders}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                    <View
                        // style={styles.flatListView}
                        style={{flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 50}}
                    >
                        <Text style={{ color: 'blue' }}>No Services Listed</Text>

                    </View>

                )}
            /> */}

        </ScrollView>
    );
}