import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  TextInput,
  Button,
  Platform,
} from "react-native";
import * as yup from "yup";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Divider, ListItem } from "react-native-elements";
import PersonalInformation from "./PersonalInformationForm";
import styles from "./styles";
import useFormal from "@kevinwolf/formal-native";

export default function MedicationForm() {
  const schema = yup.object().shape({
    dose: yup.string().required(),
    numTimesPerDay: yup.number().required(),
    usageInstructions: yup.string().required(),
  });
  const initialValues = {
    dose: "",
    numTimesPerDay: 0,
    usageInstructions: "",
  };
  const formal = useFormal(initialValues, {
    schema,
    onSubmit: (values) => {
      Alert.alert(JSON.stringify(values) + " " + date.toString());
      setModalVisible(!modalVisible);
    },
  });
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  var info = [
    {
      name: "test1",
      dose: "test2", // ex: can be milligrams or milliliter
      numTimesDay: "test3",
      usageInstructions: "test4",
      refillDate: "234234325", // Date;}];
    },
    {
      name: "test1",
      dose: "test2", // ex: can be milligrams or milliliter
      numTimesDay: "test3",
      usageInstructions: "test4",
      refillDate: "234234325", // Date;}];
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ backgroundColor: "#219ebc" }}>
      {info.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.MainTitle}>
              Name: {l.name}
            </ListItem.Title>

            <ListItem.Subtitle style={styles.subTitle}>
              Dose: {l.dose}
            </ListItem.Subtitle>
            <ListItem.Subtitle style={styles.subTitle}>
              Number Of Times Per Day: {l.numTimesDay}
            </ListItem.Subtitle>
            <ListItem.Subtitle style={styles.subTitle}>
              Usage Instructions: {l.usageInstructions}
            </ListItem.Subtitle>
            <ListItem.Subtitle style={styles.subTitle}>
              Refill Date: {l.refillDate}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          showMode("date");
        }}
      >
        <View
          style={{
            marginBottom: 30,
            marginTop: 20,
            alignSelf: "center",
            backgroundColor: "#023047",
            width: 400,
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
            Add Medication +
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          style={styles.modal}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.inputContainer}>
                <Text style={styles.buttonLabel}>Dose</Text>
                <TextInput
                  style={styles.input}
                  {...formal.getFieldProps("dose")}
                />
                {formal.errors.dose && (
                  <Text style={styles.error}>{formal.errors.dose}</Text>
                )}
                <Text style={styles.buttonLabel}>Number of times per day</Text>
                <TextInput
                  style={styles.input}
                  {...formal.getFieldProps("numTimesPerDay")}
                />
                {formal.errors.numTimesPerDay && (
                  <Text style={styles.error}>
                    {formal.errors.numTimesPerDay}
                  </Text>
                )}
                <Text style={styles.buttonLabel}>Instructions</Text>
                <TextInput
                  style={styles.input}
                  {...formal.getFieldProps("usageInstructions")}
                />
                {formal.errors.usageInstructions && (
                  <Text style={styles.error}>
                    {formal.errors.usageInstructions}
                  </Text>
                )}
                <View>
                  <View>
                    <Text style={styles.buttonLabel}>Refill Date:</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#FB8500",
                      alignContent: "center",
                    }}
                  >
                    {show && (
                      <DateTimePicker
                        style={{
                          alignSelf: "left",
                          width: 125,
                          height: 35,
                          marginTop: 10,
                          marginBottom: 20,
                          backgroundColor: "white",
                        }}
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="calendar"
                        onChange={onChange}
                      />
                    )}
                  </View>
                </View>
              </View>
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
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
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
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
