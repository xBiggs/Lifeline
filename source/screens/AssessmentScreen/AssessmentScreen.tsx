import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { Screens } from "..";
import { AddUserData } from "../../firebase/UserDataHandler";
import { mitigatingFactorQuestions, QuestionResponse, riskFactorQuestions } from "../../interfaces/QuestionResponse";


const NUM_RISK_FACTOR_QUESTIONS = riskFactorQuestions.length;
const NUM_MITIGATING_FACTOR_QUESTIONS = mitigatingFactorQuestions.length;



//component to render question and choices
const RiskFactorQuestionComponent = (questionResponse:QuestionResponse,questionNum:number,setQuestionNum:React.Dispatch<React.SetStateAction<number>>)=>
{
    
    return(
        <View key={questionResponse.question}>
            <Text>{questionResponse.question}</Text>
            {questionResponse.choices.map(choice=><Button key ={questionResponse.response+choice}
            title={choice} 
            onPress={()=>{
                
                questionResponse.response = choice
                setQuestionNum((questionNum+1==NUM_RISK_FACTOR_QUESTIONS?questionNum+1:questionNum+1))
                console.log(questionNum)
            }

                            }
            
            ></Button>)}

        </View>
    )

}

const MitigatingFactorQuestionComponent = (questionResponse:QuestionResponse,questionNum:number,setQuestionNum:React.Dispatch<React.SetStateAction<number>>)=>
{
    
    return(
        <View key={questionResponse.question}>
            <Text>{questionResponse.question}</Text>
            {questionResponse.choices.map(choice=><Button key ={questionResponse.response+choice}
            title={choice} 
            onPress={()=>{
                
                questionResponse.response = choice
                setQuestionNum((questionNum+1==NUM_MITIGATING_FACTOR_QUESTIONS?questionNum+1:questionNum+1))
                console.log(questionNum)
            }

                            }
            
            ></Button>)}

        </View>
    )

}





//screen component
export default (props:StackScreenProps<Screens,'Assessment'>)=>{
    const user = props.route.params.user;
    const [questionNum,setQuestionNum] = useState(0)
    
    //generated list of components for each risk factor and mitigation factor
    const RiskFactorQuestionComponents = riskFactorQuestions.map(question=>RiskFactorQuestionComponent(question,questionNum,setQuestionNum))
    const MitigatingFactorQuestionComponents = mitigatingFactorQuestions.map(question=>MitigatingFactorQuestionComponent(question,questionNum,setQuestionNum))
    const CurrentQuestion = RiskFactorQuestionComponents[questionNum]

    useEffect(()=>{
        if(questionNum == NUM_RISK_FACTOR_QUESTIONS)
        {
            try
            {
                user.riskFactors = riskFactorQuestions;
                AddUserData(user)
                alert('Thank You!')
                props.navigation.goBack();
            }catch(err)
            {
                alert((err as Error).message)
            }
            
        }
    })

   

    return(
        <View style={{
            alignContent:'center',
            alignSelf:'center',
            justifyContent:'center',
            display:'flex'
            
        }}>
            {CurrentQuestion}
        </View>
    )


}