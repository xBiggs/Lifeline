import {PersInfo} from "./source/interfaces/PersonalInfo"
import { User } from './source/interfaces/user';
import {AddPersonalData} from "./source/firebase/PersonalDetails"
import firebase from "firebase";

function dataAddTest(info: PersInfo, user: User){
    AddPersonalData(user, info);
}

let infoTest = {
    age : 500,
    race : "N/A",
    gender: "Male",
    sexual_orienation: "Straight",
    religion: "Christian",
    military_status: "N/A"
};

let usrTest = {
    firstName: "User2",
    lastName: "Test",
    email: "user2@test.com",
    id: "zhsl0t5ASpdPvloTBCAttXZUK8y2",
};

dataAddTest(infoTest, usrTest);