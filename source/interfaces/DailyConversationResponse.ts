import { QuestionResponse } from "./QuestionResponse";

export interface DailyConversationResponse {
    date: Date; // current date
    response: string; // reponse to "How are you feeling today?"
    owner: string; // user email
    riskFactors: QuestionResponse[]; // current risk factors
    mitigatingFactors: QuestionResponse[]; // current mitigating factors
    riskScore: number; // daily computed risk assessment score
}