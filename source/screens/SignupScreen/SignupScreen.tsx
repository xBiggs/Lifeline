import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";

import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Screens } from "..";
import { getSecondsBetweenDates, schedulePushNotification } from "../../Controllers/notificationsController";
import { FirebaseController } from "../../firebase/FirebaseController";
import { User } from "../../interfaces/User";
import { AuthStackParamList } from "../../types";
import styles from "./styles";

export default function SignupScreen(
  props: StackScreenProps<AuthStackParamList, "Signup">
) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error,setError]=useState("");
  const [loading, setLoading] = useState(false);

  const onFooterLinkPress = () => {
    props.navigation.navigate("Login");
  };

  // const scheduleDailyConversationNotification = (user: User, date: Date) => {
  //   const today: Date = new Date();
  //     const secondsBetweenDates = getSecondsBetweenDates(today, date);
  //     if (user.settings?.notificationsOn) {
  //       schedulePushNotification(
  //         "Apointment Alert",
  //         "You have an upcoming appointment",
  //         "click to view reason",
  //         secondsBetweenDates
  //       );
  //     }
  // }

  const onRegisterPress = async () => {
    setLoading(true);
   
   
    

    try {
      validateFirstName(firstName)
      validateLastName(lastName)
      validatePasswords(password,confirmPassword);
      const user: User = await FirebaseController.SignUp(
        firstName,
        lastName,
        email,
        password
      );
      await FirebaseController.SetUserData(user);
      await FirebaseController.Login(email, password);
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
      setLoading(false);
    } 
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
             {error?<Text style={{alignSelf:'center',textAlign:'center', fontWeight:'bold',color:'white',backgroundColor:'red',fontSize:15}}>{error}</Text>:<></>}
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator color="white" size="large"></ActivityIndicator>
        ) : (
          <></>
        )}
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
function validateFirstName(firstName: string) {
  if(firstName.trim().length==0) throw {message:"First Name cannot be empty"};
}
function validateLastName(lastName:string)
{
  if(lastName.trim().length==0) throw {message:"First Name cannot be empty"};
}

function validatePasswords(password: string, confirmPassword: string) {
  if(password !== confirmPassword) throw {message:'Passwords do not match, please try again'}
}

