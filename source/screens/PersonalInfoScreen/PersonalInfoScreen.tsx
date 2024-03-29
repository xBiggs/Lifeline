import React, { useEffect, useState } from "react";
import { Alert, View, Text, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useFormal from "@kevinwolf/formal-native";
import * as yup from "yup";
import {
  BottomSheet,
  ButtonGroup,
  Divider,
  ListItem,
} from "react-native-elements";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AddPersonalData, AddUserData } from "../../firebase/UserDataHandler";
import { PersInfo } from "../../interfaces/PersonalInfo";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { HomeDrawerParamList } from "../../types";
import { MedicationInfo } from "../../interfaces/MedicalInfo";

export default function PersonalInfoScreen(
  props: DrawerScreenProps<HomeDrawerParamList, "Information">
) {
  const user = props.route.params.user;
  const buttonsGender = ["Male", "Female", "Other"];

  //Create  local medical Info for update.
  var tempPersonalInfo: PersInfo = {
    age: "",
    race: "",
    gender: "",
    sexualOrientation: "",
    religion: "",
    militaryStatus: "",
    phone: "",
  };
  var tempMedicalInfo: MedicationInfo = {
    diagnose: [],
    medication: [],

    familyMedicalHistory: [],
    nextApointment: [],
  };

  if (user.medInfo) tempMedicalInfo = user.medInfo;
  if (user.personalInfo) tempPersonalInfo = user.personalInfo;

  //Radio Button Initialization
  let initialValue = 0;
  switch (tempPersonalInfo.gender.toLowerCase()) {
    case "male":
      initialValue = 0;
      break;
    case "female":
      initialValue = 1;
      break;
    case "other":
      initialValue = 2;
  }

  //Formal Verification
  const [gender, setRadio] = useState(initialValue);
  const phoneRegExp = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  const schema = yup.object().shape({
    age: yup
      .number()
      .required("Age is Required")
      .typeError("Age must be a number")
      .positive("Value must be greated than 0"),
    religion: yup.string().required("Religion is required"),
    diagnose: yup.string().required("Diagnosis is required"),

    familyMedicalHistory: yup
      .string()
      .required("Family Medical History is required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
  });

  //Formal Initializers
  const initialValues = {
    age: tempPersonalInfo.age,
    religion: tempPersonalInfo.religion,
    diagnose: tempMedicalInfo.diagnose.join(", "),
    familyMedicalHistory: tempMedicalInfo.familyMedicalHistory.join(", "),
    phone: tempPersonalInfo.phone,
  };

  const handleRadioInput = (e: any) => {
    setRadio(e);
  };

  //List Setters

  const changeRace = (e: React.SetStateAction<string>) => {
    setRace(e);
    setIsVisible(false);
  };

  const changeMilitaryStatus = (e: React.SetStateAction<string>) => {
    setMilitaryStatus(e);
    setIsVisibleMilitaryStatus(false);
  };
  const changeSexualOrientation = (e: React.SetStateAction<string>) => {
    setSexualOrientation(e);
    setIsVisibleSexualOrientation(false);
  };
  //Formal submission
  const formal = useFormal(initialValues, {
    schema,
    onSubmit: async (values) => {
      tempPersonalInfo.age = values.age;
      tempPersonalInfo.gender = buttonsGender[gender];
      tempPersonalInfo.militaryStatus = militaryStatus;
      tempPersonalInfo.race = race;
      tempPersonalInfo.religion = values.religion;
      tempPersonalInfo.sexualOrientation = sexualOrientation;
      tempPersonalInfo.phone = values.phone;

      tempMedicalInfo.diagnose = values.diagnose.split(",").map((word) => {
        return word.trim();
      });
      tempMedicalInfo.familyMedicalHistory = values.familyMedicalHistory
        .split(",")
        .map((word) => {
          return word.trim();
        });

      user.medInfo = tempMedicalInfo;
      user.personalInfo = tempPersonalInfo;

      await AddUserData(user);
      Alert.alert("Thank You!");
      // props.navigation.goBack();
      //Implement use effect navigation
    },
  });

  //State Variables
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleSexualOrientation, setIsVisibleSexualOrientation] = useState(
    false
  );
  const [isVisibleMilitaryStatus, setIsVisibleMilitaryStatus] = useState(false);
  const [race, setRace] = useState(tempPersonalInfo.race);
  const [sexualOrientation, setSexualOrientation] = useState(
    tempPersonalInfo.sexualOrientation
  );
  const [militaryStatus, setMilitaryStatus] = useState(
    tempPersonalInfo.militaryStatus
  );

  //Races Option
  const list = [
    { title: "White", onPress: () => changeRace("White") },
    { title: "Black", onPress: () => changeRace("Black") },
    { title: "Native American", onPress: () => changeRace("Native American") },
    { title: "Native Hawaiian", onPress: () => changeRace("Native Hawaiian") },
    { title: "Hispanic", onPress: () => changeRace("Hispanic") },
    { title: "Other", onPress: () => changeRace("Other") },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },

      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  //Sexual Orientation Options
  const listSexualOrientation = [
    {
      title: "Heterosexual",
      onPress: () => changeSexualOrientation("Heterosexual"),
    },
    {
      title: "Homosexual",
      onPress: () => changeSexualOrientation("Homosexual"),
    },
    { title: "Bisexual", onPress: () => changeSexualOrientation("Bisexual") },
    { title: "Asexual", onPress: () => changeSexualOrientation("Asexual") },
    { title: "Other", onPress: () => changeSexualOrientation("Other") },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },

      titleStyle: { color: "white" },
      onPress: () => setIsVisibleSexualOrientation(false),
    },
  ];

  //Military Status List
  const listMilitaryStatus = [
    {
      title: "Not Indicated",
      onPress: () => changeMilitaryStatus("Not Indicated"),
    },
    {
      title: "No Military Status",
      onPress: () => changeMilitaryStatus("No Military Status"),
    },
    {
      title: "Vietnam Era Veteran",
      onPress: () => changeMilitaryStatus("Vietnam Era Veteran"),
    },
    {
      title: "Other Veteran",
      onPress: () => changeMilitaryStatus("Other Veteran"),
    },
    {
      title: "Active Reserve",
      onPress: () => changeMilitaryStatus("Active Reserve"),
    },
    {
      title: "Inactive Reserve",
      onPress: () => changeMilitaryStatus("Inactive Reserve"),
    },
    {
      title: "Retired",
      onPress: () => changeMilitaryStatus("Retired"),
    },
    {
      title: "Active Duty",
      onPress: () => changeMilitaryStatus("Active Duty"),
    },

    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },

      titleStyle: { color: "white" },
      onPress: () => setIsVisibleSexualOrientation(false),
    },
  ];

  //Use Effect for Navigation
  useEffect(() => {
    if (formal.isSubmitted) props.navigation.goBack();
  }, [formal.isSubmitted]);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}> Personal Information </Text>
          <Divider
            style={{
              backgroundColor: "white",
              width: 360,
              height: 1,
              alignSelf: "center",
              marginBottom: 30,
            }}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.buttonLabel}>Age</Text>
            <TextInput style={styles.input} {...formal.getFieldProps("age")} />
            {formal.errors.age && (
              <Text style={styles.error}>{formal.errors.age}</Text>
            )}
          </View>

          <Divider
            style={{
              backgroundColor: "white",
              width: 360,
              height: 1,
              alignSelf: "center",
              marginBottom: 30,
            }}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.buttonLabel}>Diagnosis</Text>
            <Text style={styles.buttonLabel}>(Seperated by Comma)</Text>
            <TextInput
              style={styles.input}
              {...formal.getFieldProps("diagnose")}
            />
            {formal.errors.diagnose && (
              <Text style={styles.error}>{formal.errors.diagnose}</Text>
            )}
          </View>

          <Divider
            style={{
              backgroundColor: "white",
              width: 360,
              height: 1,
              alignSelf: "center",
              marginBottom: 30,
            }}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.buttonLabel}>Family Medical History</Text>
            <Text style={styles.buttonLabel}>(Seperated by Comma)</Text>
            <TextInput
              style={styles.input}
              {...formal.getFieldProps("familyMedicalHistory")}
            />
            {formal.errors.familyMedicalHistory && (
              <Text style={styles.error}>
                {formal.errors.familyMedicalHistory}
              </Text>
            )}
          </View>

          <Divider
            style={{
              backgroundColor: "white",
              width: 360,
              height: 1,
              alignSelf: "center",
              marginBottom: 30,
            }}
          />

          <Divider
            style={{
              backgroundColor: "white",
              width: 360,
              height: 1,
              alignSelf: "center",
              marginBottom: 30,
            }}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.buttonLabel}>Religion</Text>
            <TextInput
              style={styles.input}
              {...formal.getFieldProps("religion")}
            />
            {formal.errors.religion && (
              <Text style={styles.error}>{formal.errors.religion}</Text>
            )}
          </View>
          <Divider
            style={{
              backgroundColor: "white",
              width: 360,
              height: 1,
              alignSelf: "center",
              marginBottom: 30,
            }}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.buttonLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              {...formal.getFieldProps("phone")}
            />
            {formal.errors.phone && (
              <Text style={styles.error}>{formal.errors.phone}</Text>
            )}
          </View>
          <Divider
            style={{
              backgroundColor: "white",
              width: 360,
              height: 1,
              alignSelf: "center",
              marginBottom: 30,
            }}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.buttonLabel}>Gender</Text>

            <ButtonGroup
              // FIXME: Error
              onPress={handleRadioInput}
              selectedIndex={gender}
              buttons={buttonsGender}
              textStyle={{ color: "white", fontSize: 20 }}
              buttonStyle={{
                borderRadius: 10,

                height: 100,
              }}
              innerBorderStyle={{
                color: "white",
                width: 0,
              }}
              selectedButtonStyle={{ backgroundColor: "#023047" }}
              containerStyle={{
                height: 50,
                width: 330,
                marginTop: 20,
                backgroundColor: "#FB8500",
                borderWidth: 0,
              }}
            />
          </View>
          <Divider
            style={{
              backgroundColor: "white",
              width: 360,
              height: 1,
              alignSelf: "center",
              marginBottom: 30,
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.buttonLabel}>Race</Text>
        </View>

        <TouchableOpacity
          style={{
            marginBottom: 30,
            alignSelf: "center",
            backgroundColor: "white",
            width: 300,
            borderRadius: 10,
            alignContent: "center",

            padding: 10,
          }}
          onPress={() => setIsVisible(true)}
        >
          <Text
            style={{
              color: "#023047",
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {race}
          </Text>
        </TouchableOpacity>
        <Divider
          style={{
            backgroundColor: "white",
            width: 360,
            height: 1,
            alignSelf: "center",
            marginBottom: 30,
          }}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.buttonLabel}>Sexual Orientation</Text>
        </View>

        <TouchableOpacity
          style={{
            marginBottom: 30,
            alignSelf: "center",
            backgroundColor: "white",
            width: 300,
            borderRadius: 10,
            alignContent: "center",

            padding: 10,
          }}
          onPress={() => setIsVisibleSexualOrientation(true)}
        >
          <Text
            style={{
              color: "#023047",
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {sexualOrientation}
          </Text>
        </TouchableOpacity>
        <Divider
          style={{
            backgroundColor: "white",
            width: 360,
            height: 1,
            alignSelf: "center",
            marginBottom: 30,
          }}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.buttonLabel}>Military Status</Text>
        </View>

        <TouchableOpacity
          style={{
            marginBottom: 30,
            alignSelf: "center",
            backgroundColor: "white",
            width: 300,
            borderRadius: 10,
            alignContent: "center",

            padding: 10,
          }}
          onPress={() => setIsVisibleMilitaryStatus(true)}
        >
          <Text
            style={{
              color: "#023047",
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {militaryStatus}
          </Text>
        </TouchableOpacity>
        <Divider
          style={{
            backgroundColor: "white",
            width: 360,
            height: 1,
            alignSelf: "center",
            marginBottom: 30,
          }}
        />
        <TouchableOpacity {...formal.getSubmitButtonProps()} disabled={false}>
          <View
            style={{
              marginBottom: 30,
              alignSelf: "center",
              backgroundColor: "#023047",
              width: 300,
              borderRadius: 10,
              alignContent: "center",

              padding: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Submit
            </Text>
          </View>
        </TouchableOpacity>

        <BottomSheet
          modalProps={{}}
          isVisible={isVisible}
          containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
        >
          {list.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>

        <BottomSheet
          modalProps={{}}
          isVisible={isVisibleSexualOrientation}
          containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
        >
          {listSexualOrientation.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
        <BottomSheet
          modalProps={{}}
          isVisible={isVisibleMilitaryStatus}
          containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
        >
          {listMilitaryStatus.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </View>
    </KeyboardAwareScrollView>
  );
}
