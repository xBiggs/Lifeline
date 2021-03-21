// TODO: Import takes up too much space
import firebase from "firebase";
import {PersInfo} from "../interfaces/PersonalInfo"
import { User } from '../interfaces/user';

// TODO: Why does this even exist

export async function AddPersonalData(user: User, info: PersInfo) { //  credential: firebase.auth.UserCredential,
    firebase.firestore().collection('userData').add({
        id: user.id,
        Age: info.age,
        Race: info.race,
        Gender: info.gender,
        Sexual_orienation: info.sexualOrientation,
        Religion: info.religion,
        Military_status: info.militaryStatus
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