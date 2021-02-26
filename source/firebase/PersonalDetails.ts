// import firebase from "firebase";
import { firebase } from './config';
import "firebase/database";
import {PersInfo} from "../interfaces/PersonalInfo"
import { User } from '../interfaces/user';

export async function AddPersonalData(user: User, info: PersInfo) { //  credential: firebase.auth.UserCredential, info: PersInfo
    
    // firebase.firestore().collection('users').doc(user.id).set({
    //     Age: info.age,
    //     Race: info.race,
    //     Gender: info.gender,
    //     Sexual_orienation: info.sexual_orienation,
    //     Religion: info.religion,
    //     Military_status: info.military_status
    // });

    await firebase.firestore().collection('users').doc(user.id).update("medInfo", info);
}

// commands to test a function: tsc & node firebaseCRUDtest.js