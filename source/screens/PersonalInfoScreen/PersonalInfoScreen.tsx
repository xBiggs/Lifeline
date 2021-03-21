import React, { useState } from "react";
import { Alert, View, Text, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useFormal from "@kevinwolf/formal-native";
import * as yup from "yup";
import { BottomSheet, ButtonGroup, Divider, ListItem } from "react-native-elements";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AddPersonalData } from "../../firebase/UserDataHandler";
import { PersInfo } from "../../interfaces/PersonalInfo";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { HomeDrawerParamList } from "../../types";

const schema = yup.object().shape({
  age: yup.number().required(),
  religion: yup.string().required(),
});

const initialValues = {
  age: "Please Enter Age",
  religion: "List N/A if prefer not to say",
};

export default function PersonalInfoScreen(props: DrawerScreenProps<HomeDrawerParamList, "Information">) {
  const user = props.route.params.user;
  const buttonsGender = ["Male", "female", "Other"];
  // TODO: None of the variables are read lol
  const [americanIndian, setAmericanIndian] = useState();
  const [asian, setAsian] = useState();
  const [black, setBlack] = useState();
  const [hispanic, setHispanic] = useState();
  const [white, setWhite] = useState();
  const [nativeHawaiian, setNativeHawaiian] = useState();
  const [other, setOther] = useState();
  const [gender, setRadio] = useState(0);

  // TODO: Stop using keyword var, use let or const instead
  var tempPersonalInfo: PersInfo = {
    age: "",
    race: "",
    gender: "",
    sexualOrientation: "",
    religion: "",
    militaryStatus: "",
  };

  const handleRadioInput = (e: React.SetStateAction<undefined>) => {
    // FIXME: Error
    setRadio(e);
  };

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

  const formal = useFormal(initialValues, {
    schema,
    onSubmit: (values) => {
      tempPersonalInfo.age = values.age;
      tempPersonalInfo.gender = buttonsGender[gender];
      tempPersonalInfo.militaryStatus = militaryStatus;
      tempPersonalInfo.race = race;
      tempPersonalInfo.religion = values.religion;
      tempPersonalInfo.sexualOrientation = sexualOrientation;
      AddPersonalData(user, tempPersonalInfo);
      Alert.alert("Thank You!");
    },
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleSexualOrientation, setIsVisibleSexualOrientation] = useState(
    false
  );
  const [isVisibleMilitaryStatus, setIsVisibleMilitaryStatus] = useState(false);
  const [race, setRace] = useState("Select Race");
  const [sexualOrientation, setSexualOrientation] = useState(
    "Select Sexual Orientation"
  );
  const [militaryStatus, setMilitaryStatus] = useState(
    "Select Military Status"
  );

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
        <TouchableOpacity {...formal.getSubmitButtonProps()}>
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
