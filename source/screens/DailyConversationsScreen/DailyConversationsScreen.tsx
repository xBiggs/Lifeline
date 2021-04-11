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
import { BAD, DailyConversationResponse, DailyConversationResponseValue, GOOD, OK, TERRIBLE } from '../../interfaces/DailyConversationResponse';
import { FirebaseController } from '../../firebase/FirebaseController';
import firebase from 'firebase';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export default function DailyConversationsScreen(props: DrawerScreenProps<HomeDrawerParamList, "DailyConversations">) {

    const user: User = props.route.params.user;
    const [index, setIndex] = React.useState(0);
    const [text, onChangeText] = React.useState("");
    const [text2, onChangeText2] = React.useState("");
    const [text3, onChangeText3] = React.useState("");

    const submit = async () => {
        if (text.trim().length === 0 || text2.trim().length === 0 || text3.trim().length === 0) {
            alert("Response cannot be empty!");
          } else {

            // Do some ml thing to analyze text here if possible

            let risk: number = 0;
            user.mitigatingFactors?.forEach(factor => {
                risk -= factor.points;
            });
            user.riskFactors?.forEach(factor => {
                risk += factor.points;
            });
            risk += (index - 1) as DailyConversationResponseValue;

            const response: DailyConversationResponse = {
                date: firebase.firestore.Timestamp.fromDate(new Date()),
                owner: user.email,
                points: (index - 1) as DailyConversationResponseValue,
                response: text,
                response2: text2,
                response3: text3,
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

            if (risk > 0 ) {
                alert("Submission Sucessful");
                props.navigation.navigate("Vault", {user});
            } else {
                alert("Submission Sucessful");
                props.navigation.navigate("Home", {user});
            }
        }
    }

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow:1,flex:1}}>
            <View style={{ padding: 30, backgroundColor: "#219ebc",flex:1 }}>
                <Text>How are you feeling today?</Text>
                <SegmentedControl
                    values={[GOOD, OK, BAD, TERRIBLE]}
                    selectedIndex={index}
                    onChange={(event) => {
                        setIndex(event.nativeEvent.selectedSegmentIndex);
                    }}
                />
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
                <Text>Is there anything bothering you?</Text>
                <TextInput
                    onChangeText={onChangeText2}
                    value={text2}
                    multiline={true}
                    numberOfLines={4}
                    placeholder={"Examples: I'm feeling great. I'm not eating. I'm crying more."}
                    placeholderTextColor="#e5e5e5"
                    underlineColorAndroid="#e5e5e5"
                    selectionColor="#e5e5e5"
                />
                <Text>How are you feeling about your future?</Text>
                <TextInput
                    onChangeText={onChangeText3}
                    value={text3}
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