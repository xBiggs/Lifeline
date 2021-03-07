// import { StackScreenProps } from "@react-navigation/stack";
// import React, { useState } from "react";
// import { Button, SafeAreaView, Text, View } from "react-native";
// import {
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
// } from "react-native-gesture-handler";
// import { Screens } from "..";
// import styles from "./styles";
// import Icon from "react-native-vector-icons/FontAwesome5";
// import { PersInfo } from "../../interfaces/PersonalInfo";

// import {
//   AddMedicalData,
//   AddPersonalData,
// } from "../../firebase/UserDataHandler";
// import RadioForm, {
//   RadioButton,
//   RadioButtonInput,
//   RadioButtonLabel,
// } from "react-native-simple-radio-button";
// import {
//   Apointment,
//   Medication,
//   MedicationInfo,
// } from "../../interfaces/MedicalInfo";

// var formFields = {
//   age: "",
//   race: "",
//   gender: "Male",
//   sexualOrientation: "",
//   religion: "",
//   militaryStatus: "",
// };

// const tempMedication: Medication = {
//   name: "",
//   dose: "", // ex: can be milligrams or milliliter
//   numTimesDay: 0,
//   usageInstructions: "",
//   refillDate: "",
// };

// const tempAppointment: Apointment = {
//   date: "",
//   time: "",
//   reason: "",
// };

// var medicalFields: MedicationInfo = {
//   diagnose: "",
//   medication: [],
//   regiments: "",
//   familyMedicalHistory: "",
//   nextApointment: [],
// };

// const GENDERS = ["Male", "Female", "Other"];
// const genderProp = GENDERS.map((gender) => {
//   return { label: gender, value: GENDERS.indexOf(gender) };
// });

// var genderProps = [
//   { label: "Male", value: "Male" },
//   { label: "Female", value: "Female" },
//   { label: "Other", value: "Other" },
// ];

// function addMedication() {
//   if (
//     tempMedication.name == "" ||
//     tempMedication.dose == "" ||
//     tempMedication.numTimesDay == 0 ||
//     tempMedication.refillDate == "" ||
//     tempMedication.usageInstructions == ""
//   ) {
//     alert("Fields cannot be blank");
//   } else {
//     medicalFields.medication.push(tempMedication);
//     alert("Medication Added");
//   }
// }
// function addAppointment() {
//   if (
//     tempAppointment.date == "" ||
//     tempAppointment.reason == "" ||
//     tempAppointment.time == ""
//   )
//     alert("Fields cannot be blank");
//   else {
//     medicalFields.nextApointment?.push(tempAppointment);
//     alert("Appointment Added");
//   }
// }

// export default function PersonalInfoScreen(
//   props: StackScreenProps<Screens, "PersonalInfo">
// ) {
//   const user = props.route.params.user;
//   if (user.personalInfo) formFields = user.personalInfo;

//   if (user.personalInfo?.age) {
//     formFields.age = user.personalInfo.age;
//     if (user.medInfo?.diagnose)
//       medicalFields.diagnose = user?.medInfo?.diagnose;
//     if (user.medInfo?.familyMedicalHistory)
//       medicalFields.familyMedicalHistory = user?.medInfo?.familyMedicalHistory;
//     if (user.medInfo?.regiments)
//       medicalFields.regiments = user?.medInfo?.regiments;
//   }

//   const STEPS = 5; // number of screens / questions
//   const [step, setStep] = useState(1); //used to keep track of which screen to render
//   const [radio, setRadio] = useState(0);
//   // component to render current step
//   const CurrentStep = () => {
//     switch (step) {
//       case 1: {
//         //render age question
//         return (
//           <>
//             <Text style={styles.pageTitle}>Personal Information</Text>
//             <Text style={styles.buttonTitle}>Age</Text>
//             <TextInput
//               defaultValue={formFields.age}
//               style={styles.input}
//               onChangeText={(text) => (formFields.age = text)}
//             ></TextInput>

//             <Text style={styles.buttonTitle}> Race</Text>
//             <TextInput
//               defaultValue={formFields.race}
//               style={styles.input}
//               onChangeText={(text) => (formFields.race = text)}
//             ></TextInput>
//             <Text style={styles.buttonTitle}>Gender</Text>
//             <RadioForm
//               radio_props={genderProp}
//               formHorizontal={true}
//               initial={radio}
//               onPress={(value) => {
//                 setRadio(value);
//                 formFields.gender = GENDERS[value];
//                 console.log(formFields.gender);
//               }}
//             ></RadioForm>
//           </>
//         );
//       }

//       case 2: {
//         //render race question
//         return (
//           <>
//             <Text style={styles.pageTitle}>Personal Information</Text>

//             <Text style={styles.buttonTitle}>Sexual Orientation</Text>
//             <TextInput
//               defaultValue={user.personalInfo?.sexualOrientation}
//               style={styles.input}
//               onChangeText={(text) => (formFields.sexualOrientation = text)}
//             ></TextInput>
//             <Text style={styles.buttonTitle}> Religion</Text>
//             <TextInput
//               defaultValue={user.personalInfo?.religion}
//               style={styles.input}
//               onChangeText={(text) => {
//                 formFields.religion = text;
//               }}
//             ></TextInput>

//             <Text style={styles.buttonTitle}>Millitary Status?</Text>

//             <TextInput
//               defaultValue={user.personalInfo?.militaryStatus}
//               style={styles.input}
//               onChangeText={(text) => (formFields.militaryStatus = text)}
//             ></TextInput>
//           </>
//         );
//       }
//       case 3: {
//         //render gender question
//         return (
//           <>
//             <Text style={styles.pageTitle}>Medical Information</Text>
//             <Text style={styles.buttonTitle}>Diagnoses</Text>
//             <TextInput
//               defaultValue={user.medInfo?.diagnose}
//               style={styles.input}
//               onChangeText={(text) => (medicalFields.diagnose = text)}
//             ></TextInput>

//             <Text style={styles.buttonTitle}>Regiments</Text>
//             <TextInput
//               defaultValue={user.medInfo?.regiments}
//               style={styles.input}
//               onChangeText={(text) => (medicalFields.regiments = text)}
//             ></TextInput>
//             <Text style={styles.buttonTitle}> Family Medical History</Text>
//             <TextInput
//               defaultValue={user.medInfo?.familyMedicalHistory}
//               style={styles.input}
//               onChangeText={(text) =>
//                 (medicalFields.familyMedicalHistory = text)
//               }
//             ></TextInput>
//           </>
//         );
//       }
//       case 4: {
//         //render sexual orientation question
//         return (
//           <>
//             <Text style={styles.pageTitle}>Medication</Text>
//             <Text style={styles.buttonTitle}> Medication</Text>
//             <TextInput
//               style={styles.input}
//               onChangeText={(text) => (tempMedication.name = text)}
//             ></TextInput>
//             <Text style={styles.buttonTitle}>Dose</Text>
//             <TextInput
//               style={styles.input}
//               onChangeText={(text) => (tempMedication.dose = text)}
//             ></TextInput>
//             <Text style={styles.buttonTitle}>Number of Times per day</Text>
//             <TextInput
//               style={styles.input}
//               onChangeText={(text) =>
//                 (tempMedication.numTimesDay = Number(text))
//               }
//             ></TextInput>
//             <Text style={styles.buttonTitle}>Usage Instructions</Text>
//             <TextInput
//               style={styles.input}
//               onChangeText={(text) => (tempMedication.usageInstructions = text)}
//             ></TextInput>
//             <Text style={styles.buttonTitle}>Refill Date (yyyy-mm-dd)</Text>
//             <TextInput
//               style={styles.input}
//               onChangeText={(text) =>
//                 (tempMedication.refillDate = Date.parse(text).toString())
//               }
//             ></TextInput>
//             <TouchableOpacity
//               style={styles.buttonAdd}
//               onPress={() => addMedication()}
//             >
//               <Text style={styles.buttonLabelAdd}>Add Medication +</Text>
//             </TouchableOpacity>
//           </>
//         );
//       }
//       case 5: {
//         //render sexual orientation question
//         return (
//           <>
//             <>
//               <Text style={styles.pageTitle}>Next Appointments</Text>
//               <Text style={styles.buttonTitle}> Reason</Text>
//               <TextInput
//                 style={styles.input}
//                 onChangeText={(text) => (tempAppointment.reason = text)}
//               ></TextInput>
//               <Text style={styles.buttonTitle}>Time</Text>
//               <TextInput
//                 style={styles.input}
//                 onChangeText={(text) => (tempAppointment.time = text)}
//               ></TextInput>

//               <Text style={styles.buttonTitle}>Date (yyyy-mm-dd)</Text>
//               <TextInput
//                 style={styles.input}
//                 onChangeText={(text) =>
//                   (tempAppointment.date = Date.parse(text).toString())
//                 }
//               ></TextInput>
//               <TouchableOpacity
//                 style={styles.buttonAdd}
//                 onPress={() => addAppointment()}
//               >
//                 <Text style={styles.buttonLabelAdd}>Add Appointment +</Text>
//               </TouchableOpacity>
//             </>
//           </>
//         );
//       }
//       default: // case should never happen
//       {
//         return <Text>{step}</Text>;
//       }
//     }
//   };

//   // render full form
//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//       <View style={styles.container}>
//         {/* <Text style={styles.buttonTitle}>{props.route.params.user.firstName}</Text> */}
//         <CurrentStep></CurrentStep>
//         <View style={{ flex: 1, flexDirection: "row" }}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               setStep(step - 1 == 0 ? 1 : step - 1);
//             }}
//           >
//             <Icon name="arrow-left" size={40} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={async () => {
//               console.log(step, STEPS);
//               if (step == STEPS) {
//                 try {
//                   await AddPersonalData(user, formFields);
//                   await AddMedicalData(user, medicalFields);
//                   alert("Thank You");
//                   props.navigation.goBack();
//                 } catch (err) {
//                   alert(err);
//                 }
//               } else {
//                 var validated = true;
//                 switch (step) {
//                   case 1:
//                     {
//                       if (
//                         formFields.race == "" ||
//                         formFields.gender == "" ||
//                         formFields.age == ""
//                       ) {
//                         validated = false;
//                       }
//                     }
//                     break;
//                   case 2: {
//                     if (
//                       formFields.sexualOrientation == "" ||
//                       formFields.religion == "" ||
//                       formFields.militaryStatus == ""
//                     ) {
//                       validated = false;
//                     }
//                     break;
//                   }
//                   case 3:
//                     {
//                       if (
//                         medicalFields.familyMedicalHistory == "" ||
//                         medicalFields.diagnose == "" ||
//                         medicalFields.regiments == ""
//                       ) {
//                         validated = false;
//                       }
//                     }
//                     break;
//                 }
//                 if (validated) setStep(step + 1 > STEPS ? STEPS : step + 1);
//                 else alert("Fields cannot be blank");
//               }
//             }}
//           >
//             <Text style={styles.buttonLabel}>
//               {" "}
//               {step == STEPS ? (
//                 "Submit"
//               ) : (
//                 <Icon name="arrow-right" size={40} color="white" />
//               )}{" "}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }
