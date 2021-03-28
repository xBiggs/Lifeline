import { StackScreenProps } from "@react-navigation/stack";
import { View, Text, Linking, ActivityIndicator } from "react-native";
import { SafetyPlanStackParamList } from "../../../types";
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";



export default (props: StackScreenProps<SafetyPlanStackParamList, 'LocationServices'>) => {

    const { user } = props.route.params;

    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState<any>([]);
    const [latAndLong, setLatAndLong] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            // TODO: Try Catch ??
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            // TODO: Try Catch??
            let loca = await Location.getCurrentPositionAsync({});
            // FIXME: Error
            setLocation(loca);
            // console.log(location);
            
            setIsLoading(true);
            // setLatAndLong('@' + location.coords.latitude + ',' + location.coords.longitude);
            setLatAndLong(location.coords.latitude + ',' + location.coords.longitude);
            // setUrl('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDh4-cp0UHt7qioUoPCh8zwVyA8JdmTxvs');

        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }


    useEffect(() => {
        // var term = searchTerm.split(' ').join('+')
        var term = searchTerm.split(' ').join('%20')

        setSearchTerm(term.toLowerCase());
        // console.log(searchTerm);
    }, [searchTerm])


    const renderItem = ({ item }: { item: any }) => {
        console.log(item);
    };

    return (
        <View>
            <View>
                <TextInput
                    placeholder="What can I help you with today!"
                    placeholderTextColor="blue"
                    onChangeText={value => setSearchTerm(value)}
                    style={{ borderColor: "black", backgroundColor: "orange", width: 350, height: 50, marginLeft: 20, marginRight: 20, marginTop: 10 }}
                />
                {/* <Text style={{ padding: 10, fontSize: 42 }}>
                    {searchTerm}

                </Text> */}
            </View>

            <View>
                <TouchableOpacity
                    style={{ marginTop: 20, marginLeft: 20, marginRight: 20,  height: 50 }}
                    onPress={
                        async () => {


                            // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.6141808,-97.5639936&type=hospital&radius=5000&key=AIzaSyDh4-cp0UHt7qioUoPCh8zwVyA8JdmTxvs
                            const domain = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
                            const location = `location=${latAndLong}`;
                            const type = `&type=${searchTerm}`
                            const radius = '&radius=5000&rankBy=distance';
                            const key = '&key=AIzaSyDh4-cp0UHt7qioUoPCh8zwVyA8JdmTxvs';
                            const emergencyServiceUrl = domain + location + type + radius + key
                            // console.log(emergencyServiceUrl);
                            fetch(emergencyServiceUrl)
                                .then(response => response.json())
                                .then(result => setSearchData(result))
                                .catch(e => console.log(e));
                            console.log(searchData);
                            setIsLoading(false);
                        }}
                >
                    <Text>Search</Text>

                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity
                style={{justifyContent: "center", alignContent: "center", width: 200, height:50, backgroundColor: "purple", marginLeft: 100}}
                onPress={() => props.navigation.navigate('EmergencyLocations', { user })}>
                    <Text>My emergency providers</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
                {/* , backgroundColor: '#2f363c' */}
                {/* {this.state.isLoading ? ( */}
                {isLoading ? (
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ActivityIndicator size="large" color="#bad555" />
                    </View>
                ) : null}
                {/* <FlatList
                    data={searchData}
                    renderItem={() => (
                        <Text>item</Text>
                    )}

                /> */}

            </View>

        </View>
    );
}
