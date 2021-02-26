import { PersInfo } from "./PersonalInfo";
import { MedicationInfo } from "./MedicalInfo"

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    personalInfo?:PersInfo;
    medInfo?: MedicationInfo;
}