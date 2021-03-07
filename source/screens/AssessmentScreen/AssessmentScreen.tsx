import { DrawerScreenProps } from "@react-navigation/drawer";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Screens } from "..";
import { AddUserData } from "../../firebase/UserDataHandler";
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
              questionNum + 1 == NUM_RISK_FACTOR_QUESTIONS +NUM_MITIGATING_FACTOR_QUESTIONS
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
              questionNum + 1 == NUM_MITIGATING_FACTOR_QUESTIONS + NUM_RISK_FACTOR_QUESTIONS
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
export default (props: DrawerScreenProps<HomeDrawerParamList, "Assessment">) => {
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

  const AllQuestionComponents = RiskFactorQuestionComponents.concat(MitigatingFactorQuestionComponents);
  console.log(AllQuestionComponents.length)

  const CurrentQuestion = AllQuestionComponents[questionNum];

  useEffect(() => {

    if (questionNum == NUM_RISK_FACTOR_QUESTIONS+NUM_MITIGATING_FACTOR_QUESTIONS) {
      try {
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
