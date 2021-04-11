import { QuestionResponse } from "./QuestionResponse";
import firebase from 'firebase';

export interface DailyConversationResponse {
    date: firebase.firestore.Timestamp; // current date
    points: number; // tone of response. Good, OK, Bad, Terrible
    response: string; // reponse to "How are you feeling today?"
    response2: string; // reponse to "How are you feeling today?"
    response3: string; // reponse to "How are you feeling today?"
    owner: string; // user email
    riskFactors: QuestionResponse[]; // current risk factors
    mitigatingFactors: QuestionResponse[]; // current mitigating factors
    riskScore: number; // daily computed risk assessment score
}

export enum DailyConversationResponseValue {
    GOOD_VALUE = -1,
    OK_VALUE = 0,
    BAD_VALUE = 1,
    TERRIBLE_VALUE = 2
}

export const GOOD: string = "Good";
export const OK: string = "Ok";
export const BAD: string = "Bad";
export const TERRIBLE: string = "Terrible";