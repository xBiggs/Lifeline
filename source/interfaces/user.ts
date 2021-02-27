import { PersInfo } from "./PersonalInfo";
import { MedicationInfo } from "./MedicalInfo";
import { QuestionResponse } from "./QuestionResponse";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    personalInfo?: PersInfo;
    medInfo?: MedicationInfo;
    riskFactors?: QuestionResponse[];
    mitigatingFactors?: QuestionResponse[];
}