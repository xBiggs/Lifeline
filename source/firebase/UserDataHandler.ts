import { firebase } from './config';
import "firebase/database";
import {PersInfo} from "../interfaces/PersonalInfo"
import {Medication, MedicationInfo} from "../interfaces/MedicalInfo"
import { User } from '../interfaces/User';
import { getCurrentUser, getCurrentUserMedication } from './auth';
import { NotificationType } from '../interfaces/Notification';
import useFloatingHeaderHeight from '@react-navigation/stack/lib/typescript/src/utils/useHeaderHeight';
import { ContactDetails } from '../interfaces/ContactDetails';



export async function AddPersonalData(user: User,data:PersInfo) { //  credential: firebase.auth.UserCredential, info: PersInfo

    // firebase.firestore().collection('users').doc(user.id).set({
    //     Age: info.age,
    //     Race: info.race,
    //     Gender: info.gender,
    //     Sexual_orienation: info.sexual_orienation,
    //     Religion: info.religion,
    //     Military_status: info.military_status
    // });

    try
    {
        // map the data to local user object
        user.personalInfo = data;

        await firebase.firestore().collection('users').doc(user.id).update("personalInfo", data);
    }catch(err)
    {
        throw (err as Error).message;
    }

}

// updated or overwite the whole user object
export async function AddUserData(user: User){
    try{

        await firebase.firestore().collection('users').doc(user.id).update(user); // .set(user);

        /* RED ZONE */
        // await firebase.firestore().collection("users").doc(user.id).delete(); // DO NOT USE. THIS WILL DELETE THE DATA.

    }catch(err){
        throw (err as Error).message;
    }
}

export async function AddMedicalData(user: User,data: MedicationInfo) { //  credential: firebase.auth.UserCredential, info: PersInfo

    try
    {
        // map the data to local user object
        user.medInfo = data;

        await firebase.firestore().collection('users').doc(user.id).update("medInfo", user.medInfo);
    }catch(err)
    {
        throw (err as Error).message;
    }

}
export async function AddNotification(user: User,data: NotificationType) { //  credential: firebase.auth.UserCredential, info: PersInfo
   
     try
    {
        // map the data to local user object
        
       if(!user.notifications || user.notifications==undefined){
           user.notifications=[];
       }
        user.notifications.push(data);
     
  

        await firebase.firestore().collection('users').doc(user.id).update("notifications", user.notifications);
    }catch(err)
    {
        throw (err as Error).message;
    }

}

export async function AddContacts(user: User, emergencyContact: ContactDetails[]) {
    try{
        if(!user.emergencyContacts || user.emergencyContacts==undefined){
            user.emergencyContacts=[];
        }
        user.emergencyContacts = emergencyContact;

        await firebase.firestore().collection('users').doc(user.id).update("EmergencyContactInfo", user.emergencyContacts);
        return true;
    } catch(err) {
        throw (err as Error).message;
    }
}

// commands to test a function: tsc & node firebaseCRUDtest.js