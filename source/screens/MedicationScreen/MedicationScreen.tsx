import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import * as yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon, ListItem } from "react-native-elements";
import styles from "./styles";
import useFormal from "@kevinwolf/formal-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { HomeDrawerParamList } from "../../types";
import { FirebaseController } from "../../firebase/FirebaseController";
import { Medication, MedicationInfo } from "../../interfaces/MedicalInfo";
import { NotificationType } from "../../interfaces/Notification";
import {
  AddMedicalData,
  AddNotification,
} from "../../firebase/UserDataHandler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  getSecondsBetweenDates,
  schedulePushNotification,
} from "../../Controllers/notificationsController";
import { ScrollView } from "react-native-gesture-handler";

// TODO: These imports take up too much space. Try to be more specific with imports if possible
import moment from "moment";
import firebase from "firebase";

export default function MedicationForm(
  props: DrawerScreenProps<HomeDrawerParamList, "Medication">
) {
  //STATE VARIABLES////////////////////////////
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const user = props.route.params.user;
  const [userData, setUserData] = useState<MedicationInfo>();
  const [userNotifications, setUserNotifications] = useState<
    NotificationType[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);

  //STATE VARIABLES END////////////////////////////
  //////////////////////////Formal Data////////////////
  const medicalFields: MedicationInfo = {
    diagnose: [],
    medication: [],
    regiments: "",
    familyMedicalHistory: [],
    nextApointment: [],
  };
  const schema = yup.object().shape({
    name: yup.string().required(),
    dose: yup.string().required(),
    numTimesDay: yup.number().required(),
    usageInstructions: yup.string().required(),
  });
  const initialValues = {
    dose: "",
    name: "",
    numTimesDay: 0,
    usageInstructions: "",
  };
  var tempMedication = {
    name: "string",
    dose: "string", // ex: can be milligrams or milliliter
    numTimesDay: 4,
    usageInstructions: "string",
    refillDate: "string", // Date;
  };

  const deleteMedication = async (medication: Medication) => {
    let index: number;
    if (user.medInfo?.medication) {
      index = user.medInfo?.medication.indexOf(medication);
      user.medInfo?.medication.splice(index, 1);
      await FirebaseController.SetUserData(user);
    }
    setUserData(user.medInfo);
  };
  //FORM SUBMISSION
  const formal = useFormal(initialValues, {
    schema,
    onSubmit: async (values) => {
      // TODO: Don't use keyword var, user keywords let or const instead
      var medication: Medication = {
        name: values.name,
        dose: values.dose,
        numTimesDay: values.numTimesDay,
        usageInstructions: values.usageInstructions,
        refillDate: date.toString(),
      };
      // TODO: Don't use keyword var, user keywords let or const instead
      var notification: NotificationType = {
        date: firebase.firestore.Timestamp.fromDate(date),
        title: "Refill Medication: " + values.name,
        information:
          'This is a reminder to Refill your medication "' +
          values.name +
          '" by ' +
          moment(date).format("MMM Do YY"),
        actionScreen: "Medication",
        actionScreenTitle: "View Instructions",
        imageURL: "../../images/medicine.png",
      };

      const today: Date = new Date();
      const secondsBetweenDates = getSecondsBetweenDates(today, date);
      if (user.settings?.notificationsOn) {
        schedulePushNotification(
          "Medication Alert",
          "Need to refill: " + values.name,
          "click to view instructions",
          secondsBetweenDates
        );
      }

      userData?.medication.push(medication);
      if (userData) AddMedicalData(user, userData);

      if (userNotifications) AddNotification(user, notification);
      setModalVisible(!modalVisible);
    },
  });

  //DATE OBJECT///////////
  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setMode(currentMode);
    setShow(true);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  //DATE OBJECT END///////////

  //////////////////////////END////////////////

  //GET INFO///////////////////////
  useEffect(() => {
    const getinfo = async () => {
      setUserData(user.medInfo);
      if (user.notifications) setUserNotifications(user.notifications);
      else setUserNotifications([]);
    };

    getinfo();
  }, []);

  // TODO: Stop using keyword var, use keywords let or const instead
  var info: Medication[] = [];
  if (userData && !userData?.medication) {
    userData.medication = [];
  }

  if (userData) info = userData.medication;
  else info = [];

  //GET INFO END///////////////////////

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ backgroundColor: "#219ebc", flex: 1 }}>
        {info
          ? info.map((l, i) => (
              <ListItem key={i * Math.random()} bottomDivider>
                <ListItem.Content>
                  <View style={{ flexDirection: "row" }}>
                    <ListItem.Title style={styles.MainTitle}>
                      Name: {l.name}
                    </ListItem.Title>
                  </View>

                  <ListItem.Subtitle style={styles.subTitle}>
                    Dose: {l.dose}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={styles.subTitle}>
                    Number Of Times Per Day: {l.numTimesDay.toString()}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={styles.subTitle}>
                    Usage Instructions: {l.usageInstructions}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={styles.subTitle}>
                    Refill Date: {l.refillDate}
                  </ListItem.Subtitle>
                  <TouchableOpacity onPress={() => deleteMedication(l)}>
                    <Icon name="delete" type="material" color="#517fa4" />
                  </TouchableOpacity>
                </ListItem.Content>
              </ListItem>
            ))
          : null}

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
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
            <KeyboardAwareScrollView
              contentContainerStyle={{ alignItems: "center" }}
            >
              <View style={styles.modalView}>
                <View style={styles.inputContainer}>
                  <Text style={styles.buttonLabel}>Name</Text>
                  <TextInput
                    style={styles.input}
                    {...formal.getFieldProps("name")}
                  />
                  {formal.errors.name && (
                    <Text style={styles.error}>{formal.errors.name}</Text>
                  )}
                  <Text style={styles.buttonLabel}>Dose</Text>
                  <TextInput
                    style={styles.input}
                    {...formal.getFieldProps("dose")}
                  />
                  {formal.errors.dose && (
                    <Text style={styles.error}>{formal.errors.dose}</Text>
                  )}
                  <Text style={styles.buttonLabel}>
                    Number of times per day
                  </Text>
                  <TextInput
                    style={styles.input}
                    {...formal.getFieldProps("numTimesDay").value}
                  />
                  {formal.errors.numTimesDay && (
                    <Text style={styles.error}>
                      {formal.errors.numTimesDay}
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
                      <TouchableOpacity onPress={showDatepicker}>
                        <Text style={styles.buttonLabel}>
                          Select Refill Date
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        backgroundColor: "#FB8500",
                        alignContent: "center",
                      }}
                    >
                      {show && (
                        <DateTimePicker
                          minimumDate={new Date()}
                          // FIXME: Error
                          style={{
                            width: 125,
                            height: 35,
                            marginTop: 10,
                            marginBottom: 20,
                            backgroundColor: "white",
                          }}
                          testID="dateTimePicker"
                          value={date}
                          // FIXME: Error
                          mode={mode}
                          is24Hour={true}
                          display="calendar"
                          //FIXME: Error
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
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
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
            </KeyboardAwareScrollView>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
}
