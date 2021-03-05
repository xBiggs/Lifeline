import React, { useState } from "react";
import { Alert, View, Text, TextInput, Button } from "react-native";
import useFormal from "@kevinwolf/formal-native";
import * as yup from "yup";
import { ButtonGroup, CheckBox } from "react-native-elements";
import PersonalInformation from "../../Forms/PersonalInformationForm";
import MedicationForm from "../../Forms/MedicationForm";

export default function PersonalInfoScreen() {
  return <MedicationForm></MedicationForm>;
}
