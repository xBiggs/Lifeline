import { StackScreenProps } from '@react-navigation/stack';
import React, { useReducer, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Screens } from '..';



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
                            <Text>City?</Text>
                            <TextInput style={{
                                borderWidth: 3,
                                borderColor: 'black'
                            }}
                            onChangeText={(text)=>city=text}
                            ></TextInput>
                        </>
                    )

                }
            case 2: //render state question
                {
                    return (
                        <>
                            <Text>State?</Text>
                            <TextInput style={{
                                borderWidth: 3,
                                borderColor: 'black'

                            }}></TextInput>
                        </>
                    )
                }
            case 3: //render Country question
                {
                    return (
                        <>
                            <Text>Country?</Text>
                            <TextInput style={{
                                borderWidth: 3,
                                borderColor: 'black'

                            }}></TextInput>
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
        <View>
            <Text>{props.route.params.user.firstName}</Text>
            <CurrentStep></CurrentStep>
            <Button title="Go Back" onPress={() => {
                setStep(step - 1 == 0 ? 1 : step - 1)
            }}></Button>
            <Button title={step == STEPS ? 'Submit' : 'Next'} onPress={() => {
                setStep((step + 1 > STEPS ? STEPS : step + 1))
            }}></Button>
        </View>
    )
}