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
// https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript
var date = new Date(2021, 3, 30, 20, 50, 23);
var refilDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
var aptDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 10);
var aptTime = new Date(date.getTime()); // can't extract the time from date for whatever reason
var medInfoTest = {
    diagnose: "Anxiety and Depression",
    medication: [
        {
            name: "Xanax",
            dose: "5ml",
            numTimesDay: 1,
            usageInstructions: "Once a day by mouth.",
            refilDate: refilDate
        }, {
            name: "Losartin",
            dose: "25mg",
            numTimesDay: 3,
            usageInstructions: "Three times a day mouth."
        }
    ],
    regiments: "Meditation",
    familyMedicalHistory: "None",
    nextApointment: [{
            date: aptDate,
            time: aptTime,
            reason: "X-Ray"
        }]
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
