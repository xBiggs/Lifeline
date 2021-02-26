"use strict";
exports.__esModule = true;
var UserDataHandler_1 = require("./source/firebase/UserDataHandler");
function dataAddTest(user, perInfo, medInfo) {
    UserDataHandler_1.AddUserData(user);
    // AddMedicalData(user, medInfo);
}
var personalInfoTest = {
    age: "50",
    race: "N/A",
    gender: "Male",
    sexualOrientation: "Straight",
    religion: "Christian",
    militaryStatus: "N/A"
};
var medInfoTest = {
    diagnose: "Anxiety and Depression",
    medication: {
        name: "Xanax",
        dose: "25ml",
        numTimesDay: 1,
        usageInstructions: "Once a day daily by mouth."
    },
    regiments: "Meditation",
    familyMedicalHistory: "None"
};
var usrTest = {
    firstName: "User3",
    lastName: "Test3",
    email: "user3@test.com",
    id: "PlFWiLE0IlUhO2l6pXEr87BNoZS2",
    personalInfo: personalInfoTest,
    medInfo: medInfoTest
};
dataAddTest(usrTest, personalInfoTest, medInfoTest);
