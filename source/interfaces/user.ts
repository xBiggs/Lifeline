import { PersInfo } from "./PersonalInfo";
import { MedicationInfo } from "./MedicalInfo";
import { QuestionResponse } from "./QuestionResponse";
import { NotificationType } from "./Notification";
import SocialEngagement from "./socialEngagements";
import { ContactDetails } from "./ContactDetails";
import { WarningSign } from "./WarningSign";

export interface User {
    notifications: NotificationType[];
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    personalInfo?: PersInfo;
    medInfo?: MedicationInfo;
    riskFactors?: QuestionResponse[];
    mitigatingFactors?: QuestionResponse[];
    copingStrategies?:string[];
    socialEngagements?:SocialEngagement
    emergencyContacts?: ContactDetails[]; // new
    warningSigns?: WarningSign[]; // new
}