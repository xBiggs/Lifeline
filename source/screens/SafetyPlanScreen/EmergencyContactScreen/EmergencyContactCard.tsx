import React from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ContactDetails } from "../../../interfaces/ContactDetails";
import { faPhone, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface Props {
    emergencyContact: ContactDetails;
    onPressCall: () => void;
    onPressDelete: () => void;
}

// render emergency contact + call + delete
const EmergencyContactCard: React.FC<Props> = (props) => {
    return (
        <View style={styles.item}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, marginTop: 10 }}>
                    <TouchableOpacity onPress={props.onPressDelete}>
                        <FontAwesomeIcon size={25} icon={faTrash}></FontAwesomeIcon>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={styles.title}>Call {props.emergencyContact.firstName} {props.emergencyContact.lastName}</Text>
                </View>
                <View style={{ flex: 1, marginTop: 10 }}>
                    <TouchableOpacity onPress={props.onPressCall}>
                        <FontAwesomeIcon size={25} icon={faPhone}></FontAwesomeIcon>
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
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#51a4e8', height: 45,
        borderRadius: 15, width: 300,
        marginTop: 5, marginBottom: 15, marginLeft: 45,
        paddingLeft: 10
    },
    title: {
        fontSize: 20,
        color: "white",
    },
});

export default EmergencyContactCard;
