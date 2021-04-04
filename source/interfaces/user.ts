import { PersInfo } from "./PersonalInfo";
import { MedicationInfo } from "./MedicalInfo";
import { QuestionResponse } from "./QuestionResponse";
import { NotificationType } from "./Notification";
import SocialEngagement from "./socialEngagements";
import { ContactDetails } from "./ContactDetails";
import { WarningSign } from "./WarningSign";
import * as Contacts from 'expo-contacts';
import { Settings } from "react-native";
import { SettingsType } from "./Settings";
import { VaultItems } from "./VaultItems";
import { EmergencyLocationProvider } from "./EmergencyLocationProvider"

export interface User {
    notifications?: NotificationType[];
    firstName: string;
    lastName: string;
    email: string;
    id: string;

    location?:string; // new - used in EmergencyLocationScreen & LocationServicesScreen
    phoneNumber?: number;

    personalInfo?: PersInfo;
    medInfo?: MedicationInfo;
    riskFactors?: QuestionResponse[];
    mitigatingFactors?: QuestionResponse[];
    copingStrategies?:string[];
    socialEngagements?:SocialEngagement
    emergencyContacts?: ContactDetails[];//Contacts.Contact[]; // new
    warningSigns?: WarningSign[]; // new
    settings?:SettingsType;
    vaultItems?:VaultItems;
    emergencyProviders?: EmergencyLocationProvider[];
}