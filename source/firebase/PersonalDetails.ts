import firebase from "firebase";
import "firebase/database";
import {PersInfo} from "../interfaces/PersonalInfo"
import { User } from '../interfaces/user';

export async function AddPersonalData(user: User, info: PersInfo) { //  credential: firebase.auth.UserCredential,
    firebase.firestore().collection('userData').add({
        id: user.id,
        Age: info.age,
        Race: info.race,
        Gender: info.gender,
        Sexual_orienation: info.sexual_orienation,
        Religion: info.religion,
        Military_status: info.military_status
    });
    
    // firebase.database().ref('userData/' + user.id).set({
    //     id: user.id,
    //     Age: info.age,
    //     Race: info.race,
    //     Gender: info.gender,
    //     Sexual_orienation: info.sexual_orienation,
    //     Religion: info.religion,
    //     Military_status: info.military_status
    // });
}