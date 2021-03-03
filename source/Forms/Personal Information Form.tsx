import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Alert,
  View,
  Text,
  TextInput,
  Button,
  NativeAppEventEmitter,
} from "react-native";
import useFormal from "@kevinwolf/formal-native";
import * as yup from "yup";
import {
  BottomSheet,
  ButtonGroup,
  CheckBox,
  Divider,
  ListItem,
} from "react-native-elements";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";

const schema = yup.object().shape({
  age: yup.number().required(),
});

const initialValues = {
  age: 0,
};

export default function PersonalInformation() {
  const buttonsGender = ["Male", "female", "Other"];

  const [americanIndian, setAmericanIndian] = useState();
  const [asian, setAsian] = useState();
  const [black, setBlack] = useState();
  const [hispanic, setHispanic] = useState();
  const [white, setWhite] = useState();
  const [nativeHawaiian, setNativeHawaiian] = useState();
  const [other, setOther] = useState();
  const [radio, setRadio] = useState();

  const handleRadioInput = (e) => {
    setRadio(e);
    console.log(radio);
  };

  const changeRace = (e) => {
    setRace(e);
    setIsVisible(false);
  };

  const formal = useFormal(initialValues, {
    schema,
    onSubmit: (values) => Alert.alert(JSON.stringify(values)),
  });

  const [isVisible, setIsVisible] = useState(false);
  const [race, setRace] = useState("Select Race");

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

  return (
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
          <Text style={styles.buttonLabel}>Gender</Text>

          <ButtonGroup
            onPress={handleRadioInput}
            selectedIndex={radio}
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
        {/* <View style={{ flexDirection: "row" }}>
          <View>
            <CheckBox
              containerStyle={styles.containerCheck}
              title="White"
              checked={white}
              onPress={() => setWhite(!white)}
              checkedColor="#023047"
              textStyle={styles.buttonLabel}
              uncheckedColor="white"
            />
          </View>

          <View>
            <CheckBox
              containerStyle={styles.containerCheck}
              title="Black"
              checked={black}
              onPress={() => setBlack(!black)}
              checkedColor="#023047"
              textStyle={styles.buttonLabel}
              uncheckedColor="white"
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <CheckBox
              containerStyle={styles.containerCheck}
              title="Native American"
              checked={americanIndian}
              onPress={() => setAmericanIndian(!americanIndian)}
              checkedColor="#023047"
              textStyle={styles.buttonLabel}
              uncheckedColor="white"
            />
          </View>
          <View>
            <CheckBox
              containerStyle={styles.containerCheck}
              title="Native Hawaiian"
              checked={nativeHawaiian}
              onPress={() => setNativeHawaiian(!nativeHawaiian)}
              checkedColor="#023047"
              textStyle={styles.buttonLabel}
              uncheckedColor="white"
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <CheckBox
              containerStyle={styles.containerCheck}
              title="Hispanic"
              checked={hispanic}
              onPress={() => setHispanic(!hispanic)}
              checkedColor="#023047"
              textStyle={styles.buttonLabel}
              uncheckedColor="white"
            />
          </View>
          <View>
            <CheckBox
              containerStyle={styles.containerCheck}
              title="Other"
              checked={other}
              onPress={() => setOther(!other)}
              checkedColor="#023047"
              textStyle={styles.buttonLabel}
              uncheckedColor="white"
            />
          </View>
        </View> */}
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
    </View>
  );
}
