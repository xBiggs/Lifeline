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
import { ListItem } from "react-native-elements";
import styles from "./styles";
import useFormal from "@kevinwolf/formal-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { HomeDrawerParamList } from "../../types";
import { FirebaseController } from "../../firebase/FirebaseController";
import { Apointment, MedicationInfo } from "../../interfaces/MedicalInfo";
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

// TODO: These imports take up too much space, try to be more specific on imports if possible
import moment from "moment";
import firebase from "firebase";

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
  // TODO: Time is never used
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState("date");
  // TODO: modeTime is never used
  const [modeTime, setModeTime] = useState("date");
  const [show, setShow] = useState(false);
  // TODO: showTime is never used
  const [showTime, setShowTime] = useState(false);
  const user = props.route.params.user;

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
      const user = props.route.params.user;
      const secondsBetweenDates = getSecondsBetweenDates(today, date);
      if (user.settings?.notificationsOn) {
        schedulePushNotification(
          "Apointment Alert",
          "You have an upcoming appointment",
          "click to view reason",
          secondsBetweenDates - 86400
        );
      }

      userData?.nextApointment?.push(appointmentTemp);

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
  const showTimepicker = () => {
    showMode("time");
  };

  //DATE OBJECT END///////////

  //////////////////////////END////////////////

  // TODO: never use keyword var, and this variable is never used. Use keywords let or const instead of var please
  var tempAppointment = {
    date: firebase.firestore.Timestamp.fromDate(new Date()), // Date;
    // Date; // have to extract time from date object
    reason: "",
  };
  //GET INFO///////////////////////
  useEffect(() => {
    const getinfo = async () => {
      setUserData(user.medInfo);
      if (user.notifications) setUserNotifications(user.notifications);
      else setUserNotifications([]);

      return user;
    };

    getinfo();
  }, []);

  var info: Apointment[] = [];

  if (userData && !userData?.nextApointment) {
    userData.nextApointment = [];
  }

  // TODO: I think you spelled Appointment wrong, nextApointment can be null here
  if (userData) info = userData.nextApointment;
  else info = [];

  //GET INFO END///////////////////////
  info.forEach((element, i) => {
    const tempDate = element.date.toDate();
    console.log(tempDate);
    if (moment(tempDate).isBefore(moment(), "day")) {
      info.splice(i);
    }
  });

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={{ backgroundColor: "#219ebc",flexGrow:1}}>
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
                      <TouchableOpacity onPress={showDatepicker}>
                        <Text style={styles.buttonLabel}>Select Date</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={{ marginTop: 20, marginBottom: 20 }}
                        onPress={showTimepicker}
                      >
                        <Text style={styles.buttonLabel}>Select Time</Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        backgroundColor: "#FB8500",
                        alignContent: "center",
                      }}
                    >
                      {/* <Text style={styles.buttonLabel}> Date:</Text> */}

                      {show && (
                        <DateTimePicker
                          minimumDate={new Date()}
                          // FIXME: Error
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
                          // FIXME: Error
                          mode={mode}
                          is24Hour={true}
                          display="default"
                          // FIXME: Error
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
