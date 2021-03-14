import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { WarningSign, WarningSignValue , MODERATE, SEVERE } from "../../../interfaces/WarningSign";

interface Props {
    warningSign: WarningSign,
    onPressTrash: () => void
}

const WarningSignCard: React.FC<Props> = (props) => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{props.warningSign.sign}</Text>
            <Text>{ (props.warningSign.points == WarningSignValue.MODERATE_VALUE)? MODERATE : SEVERE }</Text>
            <TouchableOpacity onPress={props.onPressTrash}>
                <FontAwesomeIcon size={30} icon={faTrash}></FontAwesomeIcon>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default WarningSignCard;