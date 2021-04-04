import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { EmergencyLocationProvider } from "../../../interfaces/EmergencyLocationProvider";

interface Props {
    locationProvider: EmergencyLocationProvider;
    onPressTrash: () => void;
}


const EmergencyLocationCard: React.FC<Props> = (props) => {
    return (
        <View style={styles.item}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 6 }}>
                    <Text style={styles.title}>{props.locationProvider.serviceType}</Text>
                </View>
                <View style={{ flex: 1, marginTop: 10 }}>
                    <TouchableOpacity onPress={props.onPressTrash}>
                        <FontAwesomeIcon size={30} icon={faTrash}></FontAwesomeIcon>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: "#FB8500",
        padding: 20,
        marginVertical: 8,
        borderRadius: 20,
        flex: 1,
    },
    title: {
        fontSize: 32,
        color: "white",
    },
});

export default EmergencyLocationCard;
