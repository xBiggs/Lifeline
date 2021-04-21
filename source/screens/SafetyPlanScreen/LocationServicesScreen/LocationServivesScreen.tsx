// LocationServicesScreen.tsx

import { StackScreenProps } from "@react-navigation/stack";
import { View, Text, Linking, ActivityIndicator, Platform } from "react-native";
import { SafetyPlanStackParamList } from "../../../types";
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default (props: StackScreenProps<SafetyPlanStackParamList, 'LocationServices'>) => {

    const { user } = props.route.params;

    const [location, setLocation] = useState<{ coords: { latitude: number, longitude: number } }>();
    const [errorMsg, setErrorMsg] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState<{ results: any[] }>({ results: [] });
    const [latAndLong, setLatAndLong] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // formating the location based on google places api syntax
    useEffect(() => {
        //this gurantees that lat and long have the up to date value of location
        if (location) setLatAndLong(location.coords.latitude + ',' + location.coords.longitude);

        if (user.location) {
            user.location = latAndLong; // set the location attribute on user object
        }
        else {
            user.location = "No location found";
        }
    }, [location])

    // getting location from device
    useEffect(() => {
        (async () => {
            // console.log('getting location info')
            try {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg("Permission to access location was denied");
                    return;
                }
                const loca = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                setLocation(loca);
            } catch (e) {
                alert(e)
            }

        })()
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    // formating search type based on places api syntax
    const formatSearchTerm = () => {
        var term = searchTerm.split(' ').join('%20');
        return term;
    }

    // rendering the places api results
    const renderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                style={{

                    justifyContent: "center",
                    backgroundColor: "#eddd77",
                    margin: 10,
                    padding: 5,
                    height: 40,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderRadius: 10
                }}
                onPress={() => {
                    // gets direction using maps
                    if (item.vicinity) {
                        let fullAddress = item.vicinity;
                        const url = Platform.select({ // checks which device the app is running on
                            ios: `maps:0,0?q=${fullAddress}`,
                            android: `geo:0,0?q=${fullAddress}`,
                        });

                        if (url) { // opens url in maps
                            Linking.openURL(url);
                        }

                    } else { // if address is undefined, show an alert
                        alert("Could not find an address for this place!");
                    }
                }}
            >

                <Text style={{
                    textAlign: "center",
                    justifyContent: "center",
                    fontSize: 17,
                    fontStyle: "italic",
                }}
                >
                    {item.name}
                </Text>

            </TouchableOpacity>
        )
    };




    return (
        <View style={{ flex: 1 }}>
            <View>
                {/* getting the search input for places api */}
                <TextInput
                    placeholder="What can I help you with today!"
                    placeholderTextColor="blue"
                    defaultValue={searchTerm}
                    onChangeText={value => setSearchTerm(value)}
                    style={{ borderColor: "black", backgroundColor: "orange", width: 350, height: 50, marginLeft: 20, marginRight: 20, marginTop: 10 }}
                />
            </View>

            <View>
                <TouchableOpacity
                    style={{ alignContent: "center", justifyContent: "center", marginTop: 20, marginLeft: 20, marginRight: 20, height: 50, width: 90, backgroundColor: "cyan", borderRadius: 50 }}
                    onPress={
                        async () => {
                            setIsLoading(true); // Initially setting the activity indicator to false to display loading
                            const term = formatSearchTerm(); // format the search input 

                            // combine all constraints to a url
                            // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.6141808,-97.5639936&type=hospital&radius=5000&key=AIzaSyDh4-cp0UHt7qioUoPCh8zwVyA8JdmTxvs
                            const domain = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
                            const location = `location=${latAndLong}`;
                            const type = `&type=${term}`;  // searchTerm}`
                            const radius = '&radius=5000&rankBy=distance';
                            const key = '&key=AIzaSyDh4-cp0UHt7qioUoPCh8zwVyA8JdmTxvs';
                            const emergencyServiceUrl = domain + location + type + radius + key
                            const result = await fetch(emergencyServiceUrl); // fetch result from api
                            const json = await result.json(); // convert result to a json object
                            setSearchData(json); // set the search data to the json object
                            setIsLoading(false); // stop rendering the activity indicator
                            setSearchTerm(""); // set the searchTerm to empty to clear the text input
                        }}
                >
                    <Text
                        style={{ justifyContent: "center", alignContent: "center", color: "red", marginLeft: 20 }}
                    >Search</Text>

                </TouchableOpacity>

                {/* Navigating to emergenct location screen when the user can manually enter their providers details */}
                <TouchableOpacity
                    style={{ justifyContent: "center", alignContent: "center", width: 200, height: 50, backgroundColor: "#40abed", marginLeft: 100, borderRadius: 30, marginBottom: 10 }}
                    onPress={() => props.navigation.navigate('EmergencyLocations', { user })}>
                    <Text
                        style={{ justifyContent: "center", alignContent: "center", color: "red", marginLeft: 20 }}
                    >My emergency providers</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 2 }}>
                {/* Activiuty indicator (loading circle) */}
                {isLoading ? (
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ActivityIndicator size="large" color="#bad555" />
                    </View>
                ) : <>
                    {/* Display the api results */}
                    <FlatList style={{ alignSelf: 'stretch', borderWidth: 1, alignContent: 'center', margin: 3 }} data={searchData.results} keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}></FlatList>
                </>}

            </View>

        </View>

    );
}