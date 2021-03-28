import React, { useEffect } from 'react'
import { User } from '../../interfaces/User';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    TextInput,
  } from "react-native";
import { HomeDrawerParamList } from '../../types';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DailyConversationResponse } from '../../interfaces/DailyConversationResponse';
import { FirebaseController } from '../../firebase/FirebaseController';
import firebase from 'firebase';

export default function DailyConversationsScreen(props: DrawerScreenProps<HomeDrawerParamList, "DailyConversations">) {

    const user: User = props.route.params.user;
    const [text, onChangeText] = React.useState("");

    const submit = async () => {
        if (text.trim().length === 0) {
            alert("Warning sign cannot be empty!");
          } else {

            // Do some ml thing to analyze text here if possible

            let risk: number = 0;
            user.mitigatingFactors?.forEach(factor => {
                risk -= factor.points;
            });
            user.riskFactors?.forEach(factor => {
                risk += factor.points;
            });

            const response: DailyConversationResponse = {
                date: firebase.firestore.Timestamp.fromDate(new Date()),
                owner: user.email,
                response: text,
                riskFactors: user.riskFactors? user.riskFactors : [],
                mitigatingFactors: user.mitigatingFactors? user.mitigatingFactors : [],
                riskScore: risk
            }

            try {
                await FirebaseController.AddDailyConversation(response);
            } catch (e) {
                // Do Something with error here
                alert((e as Error).message);
            }
        }
    }

    return (
        <KeyboardAwareScrollView>
            <View style={{ padding: 30, backgroundColor: "#219ebc" }}>
                <Text>How are you feeling today?</Text>
                <TextInput
                    onChangeText={onChangeText}
                    value={text}
                    multiline={true}
                    numberOfLines={4}
                    placeholder={"Examples: I'm feeling great. I'm not eating. I'm crying more."}
                    placeholderTextColor="#e5e5e5"
                    underlineColorAndroid="#e5e5e5"
                    selectionColor="#e5e5e5"
                />
                <TouchableOpacity
                    onPress={() => submit()}
                    style={{
                        backgroundColor: "#023047",
                        padding: 10,
                        marginTop: 10,
                        borderRadius: 10,
                    }}
                >
                    <Text
                        style={{
                        color: "white",
                        textAlign: "center",
                        alignSelf: "center",
                        }}
                    >Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )

}