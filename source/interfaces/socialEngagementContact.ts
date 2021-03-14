import { Contact } from "expo-contacts";

export default interface SocialEngagementContact{
    id:string
    contact:Contact,
    engagements:string[]
}