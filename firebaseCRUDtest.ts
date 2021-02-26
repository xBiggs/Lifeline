import {PersInfo} from "./source/interfaces/PersonalInfo"
import {MedicationInfo} from "./source/interfaces/MedicalInfo"
import { User } from './source/interfaces/user';
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


let medInfoTest = {
    diagnose: "Anxiety and Depression",
    medication: {
        name: "Xanax",
        dose: "25ml",
        numTimesDay: 1,
        usageInstructions: "Once a day daily by mouth.",
    },
    regiments: "Meditation",
    familyMedicalHistory: "None",
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