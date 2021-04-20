import { DrawerScreenProps } from "@react-navigation/drawer";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
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
import { HomeDrawerParamList, LifeLineBlue, LifeLineDarkBlue } from "../../types";
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
    <View style={style.container} key={questionResponse.question}>
      <Text style={styles.buttonTitle}>{questionResponse.question}</Text>
      {questionResponse.choices.map((choice) => (
        <TouchableOpacity
          style={[styles.button,{alignSelf:'center',backgroundColor:LifeLineBlue,}]}
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
          <Text style={[styles.buttonLabel,{color:'white'}]}>{choice}</Text>
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
    <View style={[style.container,{backgroundColor:LifeLineBlue}]} key={questionResponse.question}>
    <Text style={styles.buttonTitle}>{questionResponse.question}</Text>
    {questionResponse.choices.map((choice) => (
      <TouchableOpacity
        style={[styles.button,{alignSelf:'center',backgroundColor:LifeLineDarkBlue,}]}
        key={questionResponse.response + choice}
        onPress={() => {
          questionResponse.response = choice;
          setQuestionNum(
            questionNum + 1 ==
              NUM_RISK_FACTOR_QUESTIONS + NUM_MITIGATING_FACTOR_QUESTIONS
              ? questionNum + 1
              : questionNum + 1
          );
        }}
      >
        <Text style={[styles.buttonLabel,{color:'white'}]}>{choice}</Text>
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
  

  const CurrentQuestion = AllQuestionComponents[questionNum];

  useEffect(() => {
    (async () => {
      if (
        questionNum ==
        NUM_RISK_FACTOR_QUESTIONS + NUM_MITIGATING_FACTOR_QUESTIONS
      ) {
        try {
          const date: Date = new Date();
          const newDate: Date = new Date(date.setMonth(date.getMonth() + 3));
          const notification: NotificationType = {
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
          if (user.settings?.notificationsOn) {
            try {
              await schedulePushNotification(
                "Evaluation Alert",
                "It is time to retake your assesment",
                "click to take evaluation",
                secondsBetweenDates
              );
            } catch (e) {
              alert((e as Error).message);
            }
          }

          if (user) AddNotification(user, notification);

          user.riskFactors = riskFactorQuestions;
          user.mitigatingFactors = mitigatingFactorQuestions;
          (async()=>{await AddUserData(user);})();
          Alert.alert("Thank You",
          "Thank you for taking the Assessment!",
          [
            {
              text:'Go Home',
              onPress:()=>{ props.navigation.navigate('Home',{user});},
              style:'default'
            }
          ]
            
            
          )
        
        } catch (err) {
          alert((err as Error).message);
        }
      }
    })();
  });

  return <View style={style.container}>{CurrentQuestion}</View>;
};


const style = StyleSheet.create({
  container:{
    justifyContent:'center',
    flex:1,
    backgroundColor:LifeLineDarkBlue
  }
})