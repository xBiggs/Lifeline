import { DrawerScreenProps } from "@react-navigation/drawer";
import { StackScreenProps } from "@react-navigation/stack";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Screens } from "..";
import {
  getSecondsBetweenDates,
  schedulePushNotification,
} from "../../Controllers/notificationsController";
import { AddNotification, AddUserData } from "../../firebase/UserDataHandler";
import { NotificationType } from "../../interfaces/Notification";
import {
  mitigatingFactorQuestions,
  QuestionResponse,
  riskFactorQuestions,
} from "../../interfaces/QuestionResponse";
import { HomeDrawerParamList } from "../../types";
import styles from "./styles";

const NUM_RISK_FACTOR_QUESTIONS = riskFactorQuestions.length;
const NUM_MITIGATING_FACTOR_QUESTIONS = mitigatingFactorQuestions.length;

//component to render question and choices
const RiskFactorQuestionComponent = (
  questionResponse: QuestionResponse,
  questionNum: number,
  setQuestionNum: React.Dispatch<React.SetStateAction<number>>
) => {
  return (
    <View style={styles.container} key={questionResponse.question}>
      <Text style={styles.buttonTitle}>{questionResponse.question}</Text>
      {questionResponse.choices.map((choice) => (
        <TouchableOpacity
          style={styles.button}
          key={questionResponse.response + choice}
          onPress={() => {
            questionResponse.response = choice;
            setQuestionNum(
              questionNum + 1 ==
                NUM_RISK_FACTOR_QUESTIONS + NUM_MITIGATING_FACTOR_QUESTIONS
                ? questionNum + 1
                : questionNum + 1
            );
            console.log(questionNum);
          }}
        >
          <Text style={styles.buttonLabel}>{choice}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const MitigatingFactorQuestionComponent = (
  questionResponse: QuestionResponse,
  questionNum: number,
  setQuestionNum: React.Dispatch<React.SetStateAction<number>>
) => {
  return (
    <View style={styles.container} key={questionResponse.question}>
      <Text style={styles.buttonTitle}>{questionResponse.question}</Text>
      {questionResponse.choices.map((choice) => (
        <TouchableOpacity
          style={styles.button}
          key={questionResponse.response + choice}
          onPress={() => {
            questionResponse.response = choice;
            setQuestionNum(
              questionNum + 1 ==
                NUM_MITIGATING_FACTOR_QUESTIONS + NUM_RISK_FACTOR_QUESTIONS
                ? questionNum + 1
                : questionNum + 1
            );
            //  console.log(questionNum);
          }}
        >
          <Text style={styles.buttonLabel}>{choice}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

//screen component
export default (
  props: DrawerScreenProps<HomeDrawerParamList, "Assessment">
) => {
  const user = props.route.params.user;
  const [questionNum, setQuestionNum] = useState(0);

  //generated list of components for each risk factor and mitigation factor
  const RiskFactorQuestionComponents = riskFactorQuestions.map((question) =>
    RiskFactorQuestionComponent(question, questionNum, setQuestionNum)
  );
  const MitigatingFactorQuestionComponents = mitigatingFactorQuestions.map(
    (question) =>
      MitigatingFactorQuestionComponent(question, questionNum, setQuestionNum)
  );

  const AllQuestionComponents = RiskFactorQuestionComponents.concat(
    MitigatingFactorQuestionComponents
  );
  console.log(AllQuestionComponents.length);

  const CurrentQuestion = AllQuestionComponents[questionNum];

  useEffect(() => {
    if (
      questionNum ==
      NUM_RISK_FACTOR_QUESTIONS + NUM_MITIGATING_FACTOR_QUESTIONS
    ) {
      try {
        var date: Date = new Date();
        var newDate: Date = new Date(date.setMonth(date.getMonth() + 3));
        var notification: NotificationType = {
          date: firebase.firestore.Timestamp.fromDate(newDate),
          title: "Retake Assesent: ",
          information:
            'It has been three months since you last took your assesment. Please retake it now. "',

          actionScreen: "Assesment",
          actionScreenTitle: "Take Assesment",
          imageURL: "../../images/medicine.png",
        };
        const today: Date = new Date();

        const secondsBetweenDates = getSecondsBetweenDates(today, newDate);

        schedulePushNotification(
          "Evaluation Alert",
          "It is time to retake your assesment",
          "click to take evaluation",
          secondsBetweenDates
        );

        if (user) AddNotification(user, notification);

        user.riskFactors = riskFactorQuestions;
        user.mitigatingFactors = mitigatingFactorQuestions;
        AddUserData(user);
        alert("Thank You!");
        props.navigation.goBack();
      } catch (err) {
        alert((err as Error).message);
      }
    }
  });

  return <View style={styles.container}>{CurrentQuestion}</View>;
};
