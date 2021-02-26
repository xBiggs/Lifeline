import { PersInfo } from "./PersonalInfo";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    personalInfo?:PersInfo
}