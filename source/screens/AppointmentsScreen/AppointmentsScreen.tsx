import React, { useEffect, useState } from "react";
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

import styles from "./styles";
import useFormal from "@kevinwolf/formal-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { HomeDrawerParamList } from "../../types";
import {
  getCurrentUserInfo,
  getCurrentUserMedication,
  SetUserData,
} from "../../firebase/auth";
import {
  Apointment,
  Medication,
  MedicationInfo,
} from "../../interfaces/MedicalInfo";
import { NotificationType } from "../../interfaces/Notification";
import {
  AddMedicalData,
  AddNotification,
} from "../../firebase/UserDataHandler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  getSecondsBetweenDates,
  schedulePushNotification,
  sendPushNotification,
} from "../../Controllers/notificationsController";
import moment from "moment";
import firebase from "firebase";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";

export default function AppointmentScreen(
  props: DrawerScreenProps<HomeDrawerParamList, "Appointments">
) {
  const appointments: Apointment = {
    date: firebase.firestore.Timestamp.fromDate(new Date()), // Date;
    // Date; // have to extract time from date object
    reason: "",
  };

  //STATE VARIABLES////////////////////////////
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [modeTime, setModeTime] = useState("date");
  const [show, setShow] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const [userData, setUserData] = useState<MedicationInfo>();
  const [userNotifications, setUserNotifications] = useState<
    NotificationType[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);

  //STATE VARIABLES END////////////////////////////
  //////////////////////////Formal Data////////////////
  const schema = yup.object().shape({
    reason: yup.string().required(),
  });
  const initialValues = {
    reason: "",
  };

  const formal = useFormal(initialValues, {
    schema,
    onSubmit: async (values) => {
      //  date.setTime(time);
      var appointmentTemp: Apointment = {
        reason: values.reason,
        date: firebase.firestore.Timestamp.fromDate(date),
      };

      var notification: NotificationType = {
        date: firebase.firestore.Timestamp.fromDate(date),
        title: "New Appointment: ",
        information: "You have a docter appointment for : " + values.reason,
        actionScreen: "Appointments",
        actionScreenTitle: "View Appointment",
        imageURL: "../../images/medicine.png",
      };
      const today: Date = new Date();

      const secondsBetweenDates = getSecondsBetweenDates(today, date);

      schedulePushNotification(
        "Apointment Alert",
        "You have an upcoming appointment",
        "click to view reason",
        secondsBetweenDates - 86400
      );
      userData?.nextApointment?.push(appointmentTemp);
      const user = props.route.params.user;

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

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const showTimepicker = () => {
    showMode("time");
  };

  //DATE OBJECT END///////////

  //////////////////////////END////////////////

  var tempAppointment = {
    date: firebase.firestore.Timestamp.fromDate(new Date()), // Date;
    // Date; // have to extract time from date object
    reason: "",
  };
  //GET INFO///////////////////////
  useEffect(() => {
    const getinfo = async () => {
      const data: any = await getCurrentUserInfo();
      setUserData(data.medInfo);
      if (data.notifications) setUserNotifications(data.notifications);
      else setUserNotifications([]);

      return data;
    };

    getinfo();
  }, []);

  var info: Apointment[] = [];

  if (userData && !userData?.nextApointment) {
    userData.nextApointment = [];
  }

  if (userData) info = userData.nextApointment;
  else info = [];

  //GET INFO END///////////////////////
  info.forEach((element, i) => {
    const tempDate = element.date.toDate();
    console.log(tempDate);
    if (moment(tempDate).isSameOrBefore(moment(), "day")) {
      info.splice(i);
    }
  });

  return (
    <KeyboardAwareScrollView>
      <View style={{ backgroundColor: "#219ebc" }}>
        {info
          ? info.map((l, i) => (
              <ListItem key={i * Math.random()} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title style={styles.MainTitle}>
                    Date: {l.date.toDate().toString()}
                  </ListItem.Title>

                  <ListItem.Subtitle style={styles.subTitle}>
                    Reason: {l.reason}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))
          : null}

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
              Add Appointment +
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
                  <Text style={styles.buttonLabel}>Reason</Text>
                  <TextInput
                    style={styles.input}
                    {...formal.getFieldProps("reason")}
                  />
                  {formal.errors.reason && (
                    <Text style={styles.error}>{formal.errors.reason}</Text>
                  )}

                  <View>
                    <View>
                      <Button onPress={showDatepicker} title="Select Date" />
                    </View>
                    <View>
                      <Button onPress={showTimepicker} title="Select Time" />
                    </View>

                    <View
                      style={{
                        backgroundColor: "#FB8500",
                        alignContent: "center",
                      }}
                    >
                      <Text style={styles.buttonLabel}> Date:</Text>

                      {show && (
                        <DateTimePicker
                          minimumDate={new Date()}
                          style={{
                            alignSelf: "left",
                            width: 180,
                            height: 35,
                            marginTop: 10,
                            marginBottom: 20,
                            backgroundColor: "white",
                          }}
                          testID="dateTimePicker"
                          value={date}
                          mode={Platform.OS == "ios" ? "datetime" : "date"}
                          is24Hour={true}
                          display="default"
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
            </View>
          </Modal>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
