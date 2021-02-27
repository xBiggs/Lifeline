import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput,TouchableOpacity } from 'react-native-gesture-handler';
import { Screens } from '..';
import styles from './styles';
import Icon from "react-native-vector-icons/FontAwesome5";
import { PersInfo } from '../../interfaces/PersonalInfo';
import { AddPersonalData } from '../../firebase/UserDataHandler';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const formFields = {
    age:'',
    race:'',
    gender:'',
    sexualOrientation:'',
    religion:'',
    militaryStatus:'',
}
const medicalFields={
    diagnose: '',
    medication: '',
    dose: '',
    regiments: '',
    family_medical_history: '',
}

var genderProps = [
    {label: 'Male', value: "Male" },
    {label: 'Female', value: "Female" },
    {label: 'Other', value: "Other" },
  ];

export default function PersonalInfoScreen(props: StackScreenProps<Screens, 'PersonalInfo'>) {
    const user = props.route.params.user;
    const STEPS = Object.keys(formFields).length; // number of screens / questions
    const [step, setStep] = useState(1); //used to keep track of which screen to render
    // component to render current step
    const CurrentStep = () => {
       
        switch (step) {
            case 1: //render age question
                {
                    return (
                        <> 
                             <Text style= {styles.pageTitle}>Personal Information</Text>
                            <Text style={styles.buttonTitle}>Age</Text>
                            <TextInput  style={styles.input}
                            onChangeText={(text)=>formFields.age=text}
                            ></TextInput>
                            <Text style={styles.buttonTitle}> Race</Text>
                            <TextInput style={styles.input}
                            onChangeText={(text)=>formFields.race=text}
                            ></TextInput>
                                   <Text style={styles.buttonTitle}>Gender</Text>
                            <TextInput style={styles.input}
                            onChangeText={(text)=>formFields.gender=text}
                            ></TextInput>
                            

                             {/* <ButtonGroup
                onPress={(selectedIndex : number)=>formFields.gender=buttons[selectedIndex]}
           
                buttons={buttons}
                containerStyle={{height: 100}}
    /> */}
                             <Text style={styles.buttonTitle}>Sexual Orientation</Text>
                            <TextInput style={styles.input}
                            onChangeText={(text)=>formFields.sexualOrientation=text}
                            ></TextInput>
                              <Text style={styles.buttonTitle}> Religion</Text>
                            <TextInput style={styles.input}
                            defaultValue={user.personalInfo?.religion}
                            onChangeText={(text)=>{
                                if(user.personalInfo)
                                {
                                    user.personalInfo.religion = text
                                }
                            }}
                            ></TextInput>
                              
                            <Text style={styles.buttonTitle}>Millitary Status?</Text>

                            <TextInput style={styles.input}
                            onChangeText={(text)=>formFields.militaryStatus=text}
                            ></TextInput>                        
                      
                        </>
                    )

                }
            case 2: //render race question
                {
                    return (
                        <>
                             <Text style= {styles.pageTitle}>Medical Information</Text>
                            <Text style={styles.buttonTitle}>Diagnoses</Text>
                            <TextInput  style={styles.input}
                            onChangeText={(text)=>medicalFields.diagnose=text}
                            ></TextInput>
                            <Text style={styles.buttonTitle}> Medication</Text>
                            <TextInput style={styles.input}
                            onChangeText={(text)=>medicalFields.medication=text}
                            ></TextInput>
                                   <Text style={styles.buttonTitle}>Dose</Text>
                            <TextInput style={styles.input}
                            onChangeText={(text)=>medicalFields.dose=text}
                            ></TextInput>
                             <Text style={styles.buttonTitle}>Regiments</Text>
                            <TextInput style={styles.input}
                            onChangeText={(text)=>medicalFields.regiments=text}
                            ></TextInput>
                              <Text style={styles.buttonTitle}> Family Medical History</Text>
                            <TextInput style={styles.input}
                            
                            defaultValue={user.personalInfo?.religion}
                            onChangeText={(text)=>medicalFields.family_medical_history=text}
                            ></TextInput>
                              
                         
                        </>
                    )
                }
            case 3: //render gender question
                {
                    return (
                        <>
                     
                        </>
                    )

                }
                case 4: //render sexual orientation question
                {
                    return (
                        <>
                           
                        </>
                    )

                }
                case 5: //render religion question
                {
                    return (
                        <>
                          
                        </>
                    )

                }
                case 6: //render military status question
                {
                    return (
                        <>
                            <Text style={styles.buttonTitle}>Millitary Status?</Text>

                            <TextInput style={styles.input}
                            onChangeText={(text)=>formFields.militaryStatus=text}
                            ></TextInput>
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
            <TouchableOpacity style={styles.button}onPress={async () => {

                //1. validate fields

                //2. pass data and user to backend
                //await AddPersonalData(user,formFields);

                // waiting

                // if success next sceeen show error





                console.log(step,STEPS);
                if(step == STEPS)
                {

                    // ADD VALIDATION TO FIELDS

                   try
                   {
                    user.personalInfo = formFields as PersInfo;
                 //   await AddPersonalData(user);
                    alert('Success')
                   }catch(err)
                   {
                       alert(err)
                   }
                }
                else
                {
                 setStep((step + 1 > STEPS ? STEPS : step + 1))
                }

            }}><Text style={styles.buttonLabel}> {step == STEPS ? 'Submit' : <Icon name="arrow-right" size={40} color="white" />} </Text></TouchableOpacity>
           </View>
        </View>
    )
}
