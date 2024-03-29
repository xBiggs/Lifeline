import { DailyConversationResponse } from '../interfaces/DailyConversationResponse';
import { User } from '../interfaces/User';
import { MediaEntry } from '../types';
import { firebase } from './config';
import { AddUserData } from './UserDataHandler';

export class FirebaseController {

    static readonly COLLECTION: string = 'users';

    static readonly DAILY_CONVERSATIONS_COLLECTION = 'dailyConversations';

    static GetUserCollectionRef(): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
        const collectionRef = firebase.firestore().collection(FirebaseController.COLLECTION);
        return collectionRef;
    }

    static GetDailyConversationsCollectionRef(): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
        const collectionRef = firebase.firestore().collection(FirebaseController.DAILY_CONVERSATIONS_COLLECTION);
        return collectionRef;
    }

    static GetCurrentUser(): firebase.User | null {
        return firebase.auth().currentUser;
    }

    static async SignUp(firstName: string, lastName: string, email: string, password: string): Promise<User> {
        const userCredential: firebase.auth.UserCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if (!userCredential.user) {
            throw ('Null firebase.auth.UserCredential.user');
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

    static async Login(email: string, password: string): Promise<firebase.auth.UserCredential> {
        const userCredential: firebase.auth.UserCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        return userCredential;
    }

    static async GetUserData(userCredential: firebase.auth.UserCredential): Promise<firebase.firestore.DocumentData | undefined> {
        if (!userCredential.user) {
            throw ('Null firebase.auth.UserCredential.user');
        }
        const uid: string = userCredential.user.uid;
        const usersRef = FirebaseController.GetUserCollectionRef();
        const document = await usersRef.doc(uid).get();
        if (!document.exists) {
            throw ("User does not exist anymore.");
        }
        const user = document.data();
        return user;
    }

    static async SetUserData(user: User): Promise<void> {
        const collectionRef = FirebaseController.GetUserCollectionRef();
        await collectionRef.doc(user.id).set(user);
    }

    static async AddDailyConversation(response: DailyConversationResponse) {
        const collectionRef = FirebaseController.GetDailyConversationsCollectionRef();
        await collectionRef.doc().set(response);
    }

    static async Logout(): Promise<void> {
        await firebase.auth().signOut();
    }

    static async GetCurrentUserMedication(): Promise<firebase.firestore.DocumentData | undefined> {
        const user = firebase.auth().currentUser;
        if (!user) {
            throw ("User is null.");
        }
        const uid = user.uid;
        const usersRef = FirebaseController.GetUserCollectionRef();
        const document = await usersRef.doc(uid).get();
        return document.data();
    }

    static async GetCurrentUserInfo(): Promise<firebase.firestore.DocumentData | undefined> {
        const user = firebase.auth().currentUser;
        if (!user) {
            throw ("User is null.");
        }
        const uid = user.uid;
        const usersRef = FirebaseController.GetUserCollectionRef();
        const document = await usersRef.doc(uid).get();
        return document.data();
    }

    static async RemoveMediaFromVault(path:string)
    {
        try{
            const ref = firebase.storage().ref().child(path);
            await ref.delete();
            return true;

        }catch(error)
        {
            alert((error as Error).message)
            return false;
        }
    }

    static async AddMediaToVault(user: User, fileInfo: { filePath: string, type: string } | undefined, filename: string): Promise<MediaEntry | undefined> {

        if (fileInfo) {
            console.log('adding to storage');
            // add to storage
            const response = await fetch(fileInfo.filePath);
            const blob = await response.blob();
            const ref = firebase.storage().ref().child(`/${user.id}/${fileInfo.type}s/${filename}`);
            const result = await ref.put(blob);
            const url = await result.ref.getDownloadURL();
            

            // console.log("adding to firebase");
            return {
                title: filename,
                type: fileInfo.type,
                url: url,
                path:result.ref.fullPath
            }
        } else return undefined;
    }

}