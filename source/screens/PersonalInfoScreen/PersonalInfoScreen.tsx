import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useReducer, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput,TouchableOpacity } from 'react-native-gesture-handler';
import { Screens } from '..';
import styles from './styles';
import Icon from "react-native-vector-icons/FontAwesome5"



export default function PersonalInfoScreen(props: StackScreenProps<Screens, 'PersonalInfo'>) {
    const user = props.route.params.user;
    const STEPS = 3; // number of screens / questions
    const [step, setStep] = useState(1); //used to keep track of which screen to render
    
    let city:string;

    //

    // component to render current step
    const CurrentStep = () => {
        switch (step) {
            case 1: //render city question
                {
                    return (
                        <>
                            <Text style={styles.buttonTitle}>City?</Text>
                            <TextInput  style={styles.input}
                            onChangeText={(text)=>city=text}
                            ></TextInput>
                        </>
                    )

                }
            case 2: //render state question
                {
                    return (
                        <>
                            <Text style={styles.buttonTitle}> State?</Text>
                            <TextInput style={styles.input}></TextInput>
                        </>
                    )
                }
            case 3: //render Country question
                {
                    return (
                        <>
                            <Text style={styles.buttonTitle}>Country?</Text>
                            <TextInput style={styles.input}></TextInput>
                        </>
                    )

                }
            default: // case should never happen
                {
                    return <Text>{step}</Text>
                }
        }

    }




    // render full form
    return (
        <View style={styles.container}>
            {/* <Text style={styles.buttonTitle}>{props.route.params.user.firstName}</Text> */}
            <CurrentStep></CurrentStep>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity  style={styles.button} onPress={() => {
                setStep(step - 1 == 0 ? 1 : step - 1)
            }} ><Icon name="arrow-left" size={40} color="white" /></TouchableOpacity>
            <TouchableOpacity style={styles.button}onPress={() => {
                setStep((step + 1 > STEPS ? STEPS : step + 1))
            }}><Text style={styles.buttonLabel}> {step == STEPS ? 'Submit' : <Icon name="arrow-right" size={40} color="white" />} </Text></TouchableOpacity>
           
           
           </View>
        </View>
    ) 
}