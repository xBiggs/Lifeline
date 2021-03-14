import React from 'react';
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import { WarningSign, WarningSignValue , MODERATE, SEVERE } from "../../interfaces/WarningSign";

const WarningSignCard: React.FC<WarningSign> = (props) => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{props.sign}</Text>
            <Text>{ (props.points == WarningSignValue.MODERATE_VALUE)? MODERATE : SEVERE }</Text>
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