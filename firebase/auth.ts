import { firebase } from "./config";
import "../interfaces/User";
import User from "../interfaces/User";
import { NativeModules } from "react-native";


async function signUp(user: User) {
    await firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(cred => {
        if (cred.user) {
            user.uid = cred.user.uid;
        }
    }).catch(err => {
        return err.message;
    })
}

async function signIn(user:User) {
    await firebase.auth().signInWithEmailAndPassword(user.email,user.password).then(cred=>{
        if(cred.user)
        {
            user.uid = cred.user.uid
        }
    }).catch(err=>{
        return err.message;
    })
    
}

async function signOut(user:User) {
    await firebase.auth().signOut().then(()=>{
        user.uid = "";
    }).catch(err=>{
        return err.message;
    })
}

console.log("test")

export default {signUp,signIn,signOut};








