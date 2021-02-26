// import firebase from "firebase";
import { firebase } from './config';
import "firebase/database";
import {PersInfo} from "../interfaces/PersonalInfo"
import { User } from '../interfaces/user';

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

// commands to test a function: tsc & node firebaseCRUDtest.js