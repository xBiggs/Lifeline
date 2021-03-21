import { User } from '../interfaces/User';
import { firebase } from './config';

export class FirebaseController {

    static readonly COLLECTION: string = 'users';

    static GetCollectionRef() : firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
        const collectionRef = firebase.firestore().collection(FirebaseController.COLLECTION);
        return collectionRef;
    }

    static GetCurrentUser() : firebase.User | null {
        return firebase.auth().currentUser;
    }

    static async SignUp(firstName: string, lastName: string, email: string, password: string) : Promise<User> {
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
        return user;
    }

    static async Login(email: string, password: string) : Promise<firebase.auth.UserCredential> {
        const userCredential: firebase.auth.UserCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        return userCredential;
    }

    static async GetUserData(userCredential: firebase.auth.UserCredential) : Promise<firebase.firestore.DocumentData | undefined> {
        if (!userCredential.user) {
            throw('Null firebase.auth.UserCredential.user');
        }
        const uid: string = userCredential.user.uid;
        const usersRef = FirebaseController.GetCollectionRef();
        const document = await usersRef.doc(uid).get();
        if (!document.exists) {
            throw("User does not exist anymore.");
        }
        const user = document.data();
        return user;
    }

    static async SetUserData(user: User) : Promise<void> {
        const collectionRef = firebase.firestore().collection('users')
        collectionRef.doc(user.id).set(user);
    }

    static async Logout() : Promise<void> {
        await firebase.auth().signOut();
    }

    static async GetCurrentUserMedication() : Promise<firebase.firestore.DocumentData | undefined> {
        const user = firebase.auth().currentUser;
        if (!user) {
            throw ("User is null.");
        }
        const uid = user.uid;
        const usersRef = FirebaseController.GetCollectionRef();
        const document = await usersRef.doc(uid).get();
        return document.data();
    }

    static async GetCurrentUserInfo() : Promise<firebase.firestore.DocumentData | undefined> {
        const user = firebase.auth().currentUser;
        if(!user) {
            throw("User is null.");
        }
        const uid = user.uid;
        const usersRef = FirebaseController.GetCollectionRef();
        const document = await usersRef.doc(uid).get();
        return document.data();
    }

}