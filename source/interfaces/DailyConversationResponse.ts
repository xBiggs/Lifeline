import { QuestionResponse } from "./QuestionResponse";
import firebase from 'firebase';

export interface DailyConversationResponse {
    date: firebase.firestore.Timestamp; // current date
    response: string; // reponse to "How are you feeling today?"
    response2: string; // reponse to "How are you feeling today?"
    response3: string; // reponse to "How are you feeling today?"
    owner: string; // user email
    riskFactors: QuestionResponse[]; // current risk factors
    mitigatingFactors: QuestionResponse[]; // current mitigating factors
    riskScore: number; // daily computed risk assessment score
}