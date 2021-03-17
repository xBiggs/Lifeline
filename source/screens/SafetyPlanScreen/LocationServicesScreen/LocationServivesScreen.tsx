import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { SafetyPlanStackParamList } from "../../../types";
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';


export default (props: StackScreenProps<SafetyPlanStackParamList, 'LocationServices'>) => {

    const [location, setLocation] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    

    return (
        <View>
            <Text>{text}</Text>
        </View>
    );
}