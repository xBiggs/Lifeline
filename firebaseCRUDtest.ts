import {PersInfo} from "./source/interfaces/PersonalInfo"
import {MedicationInfo} from "./source/interfaces/MedicalInfo"
import { User } from './source/interfaces/User';
import {AddPersonalData, AddUserData, AddMedicalData} from "./source/firebase/UserDataHandler"
import firebase from "firebase";

function dataAddTest(user: User, perInfo: PersInfo, medInfo: MedicationInfo){ // info: PersInfo,
    AddUserData(user);
    // AddMedicalData(user, medInfo);
}

let personalInfoTest = {
    age : "50",
    race : "N/A",
    gender: "Male",
    sexualOrientation: "Straight",
    religion: "Christian",
    militaryStatus: "N/A"
};

// https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript
let date = new Date(2021, 3, 30, 20, 50, 23);
let refilDate = date.toDateString();

date = new Date(date.getFullYear(), date.getMonth(), date.getDate()-10);

let aptDate = date.toDateString()// new Date(date.getFullYear(), date.getMonth(), date.getDate()-10);
// let aptTime = new Date(date.getTime()); // can't extract the time from date for whatever reason
date = new Date(2021, 3, 30, 20, 50, 23);
let aptTime = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

let medInfoTest = {
    diagnose: "Anxiety and Depression",
    medication: [
        {
        name: "Xanax",
        dose: "5ml",
        numTimesDay: 1,
        usageInstructions: "Once a day by mouth.",
        refilDate: refilDate,
    }, {
        name: "Losartin",
        dose: "25mg",
        numTimesDay: 3,
        usageInstructions: "Three times a day mouth."
    }],
    regiments: "Meditation",
    familyMedicalHistory: "None",
    nextApointment: [{
        date: aptDate,
        time: aptTime,
        reason: "X-Ray",
    }]
}




let usrTest = {
    firstName: "User3",
    lastName: "Test3",
    email: "user3@test.com",
    id: "PlFWiLE0IlUhO2l6pXEr87BNoZS2",
    personalInfo: personalInfoTest,
    medInfo: medInfoTest
};

dataAddTest(usrTest, personalInfoTest, medInfoTest);