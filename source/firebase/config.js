"use strict";
exports.__esModule = true;
exports.firebase = void 0;
var firebase_1 = require("firebase");
exports.firebase = firebase_1["default"];
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBYWKiTfE7Q_gwr0l4Key7ezZ2y3gJ3DAo",
    authDomain: "sdd21-lifeline.firebaseapp.com",
    projectId: "sdd21-lifeline",
    storageBucket: "sdd21-lifeline.appspot.com",
    messagingSenderId: "1080414105593",
    appId: "1:1080414105593:web:89844faf54ea04a40a1728",
    measurementId: "G-FR3ZHTEDBN"
};
// Initialize Firebase
if (!firebase_1["default"].apps.length) {
    firebase_1["default"].initializeApp(firebaseConfig);
}
