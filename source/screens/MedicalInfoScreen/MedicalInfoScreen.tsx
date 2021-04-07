import React from "react";
import { Alert, View, Text, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useFormal from "@kevinwolf/formal-native";
import * as yup from "yup";
import { Divider } from "react-native-elements";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { HomeDrawerParamList } from "../../types";

const schema = yup.object().shape({
  name: yup.string().required(),
  dose: yup.string().required(), // ex: can be milligrams or milliliter
  numTimesDay: yup.number().required(),
  usageInstructions: yup.string().required(),
});

const initialValues = {
  name: "test",
  dose: "test", // ex: can be milligrams or milliliter
  numTimesDay: 0,
  usageInstructions: "",
};

export default function MedicalInfoScreen(
  props: DrawerScreenProps<HomeDrawerParamList, "Medical_Information">
) {
  const formal = useFormal(initialValues, {
    schema,
    onSubmit: (values) => {
      console.log("test");
      Alert.alert("test");
    },
  });
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
            <Text style={styles.buttonLabel}>Legal Name</Text>
            <TextInput style={styles.input} {...formal.getFieldProps("name")} />
            {formal.errors.name && (
              <Text style={styles.error}>{formal.errors.name}</Text>
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
            <Text style={styles.buttonLabel}>Dose</Text>
            <TextInput style={styles.input} {...formal.getFieldProps("dose")} />
            {formal.errors.dose && (
              <Text style={styles.error}>{formal.errors.dose}</Text>
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
            <Text style={styles.buttonLabel}>Usage Instructions</Text>
            <TextInput
              style={styles.input}
              {...formal.getFieldProps("usageInstructions")}
            />
            {formal.errors.usageInstructions && (
              <Text style={styles.error}>
                {formal.errors.usageInstructions}
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
          <View style={styles.inputContainer}>
            <Text style={styles.buttonLabel}>Number Of Times Per Day</Text>
            <TextInput
              style={styles.input}
              {...formal.getFieldProps("numTimesDay")}
            />
            {formal.errors.numTimesDay && (
              <Text style={styles.error}>{formal.errors.numTimesDay}</Text>
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
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
