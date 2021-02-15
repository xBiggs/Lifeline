import { firebase } from "./config";
import { User } from "../interfaces/iUser";


export class FirebaseController {

    public static async signUp(user: User) {
        try {
            const credentials: firebase.auth.UserCredential = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            if (credentials.user) {
                user.uid = credentials.user.uid;
            }
        } catch (err) {
            return (err as Error).message;
        }
    }

    public static async signIn(user: User) {
        try {
            const credentials: firebase.auth.UserCredential = await firebase.auth().signInWithEmailAndPassword(user.email,user.password);
            if (credentials.user) {
                user.uid = credentials.user.uid;
            }
        } catch (err) {
            return (err as Error).message;
        }
    }

    public static async signOut(user: User) {
        try {
            await firebase.auth().signOut();
            user.uid = '';
        } catch (err) {
            return (err as Error).message;
        }
    }
}

console.log("test");