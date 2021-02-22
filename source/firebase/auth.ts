import { User } from '../interfaces/user';
import firebase from './config';

const COLLECTION: string = 'users';

export async function SignUp(firstName: string, lastName: string, email: string, password: string) {
    const userCredential: firebase.auth.UserCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    if (!userCredential.user) {
        throw('Null firebase.auth.UserCredential.user');
    }
    const uid = userCredential.user.uid;
    const user: User = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        id: uid
    }
    return {user, userCredential};
}

export async function Login(email: string, password: string) {
    const userCredential: firebase.auth.UserCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential;
}

export async function GetUserData(userCredential: firebase.auth.UserCredential) {
    if (!userCredential.user) {
        throw('Null firebase.auth.UserCredential.user');
    }
    const uid: string = userCredential.user.uid;
    const usersRef = firebase.firestore().collection(COLLECTION);
    const document = await usersRef.doc(uid).get();
    if (!document.exists) {
        throw("User does not exist anymore.");
    }
    const user = document.data();
    return user;
}

export async function SetUserData(user: User, credential: firebase.auth.UserCredential) {
    const userRef = firebase.firestore().collection('users')
    userRef.doc(user.id).set(user);
}

export async function Logout() {
    await firebase.auth().signOut();
}