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
import { FirebaseController } from "../../firebase/FirebaseController";
import { User } from "../../interfaces/User";
import { AuthStackParamList } from "../../types";
import styles from "./styles";

export default function SignupScreen(
  props: StackScreenProps<AuthStackParamList, "Signup">
) {

  // FIELDS TO HOLD STATE
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error,setError]=useState("");
  const [loading, setLoading] = useState(false);

  // FUNCTIONS TO ACT ON SCREEN

  const onFooterLinkPress = () => {
    props.navigation.navigate("Login");
  };

  const onRegisterPress = async () => {
    setLoading(true);

  const validate = ()=>{
    validateName(firstName)
    validateName(lastName)
    validatePassword(password)
    validatePasswordsMatch(password,confirmPassword);
  }

    try {

      validate();
      const user: User = await FirebaseController.SignUp(
        firstName,
        lastName,
        email,
        password
      );
      await FirebaseController.SetUserData(user);
      await FirebaseController.Login(email, password);
    } catch (error) {
      const message = (error as Error).message;
      if(message) setError(message);
      else setError("Cannot signup at this time, please try again");
      setLoading(false);
    }
  };

  // RENDER COMPONENT

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

// 

const validateName = (name:string)=>{
  if(name.trim().length==0) throw new Error("Name cannot be empty");
}

const validatePassword = (password:string) =>
{
  if(password.trim().length == 0) throw new Error("Password cannot be empty");
  else if(password.trim().length <6) throw new Error("Password must be 6 or more characters");
}


function validatePasswordsMatch(password: string, confirmPassword: string) {
  if(password !== confirmPassword) throw new Error ("Password and Confirm Password must match");
}

