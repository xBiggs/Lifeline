import { PersInfo } from "../interfaces/PersonalInfo";

export interface DemographicContacts {
    firstName: string,
    lastName: string,
    id?: string,
    persInfo?: PersInfo[] // phone number is in this object
}