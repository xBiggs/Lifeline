import { ActionSheetIOS } from "react-native";
import { Image } from "react-native-svg";
import { HomeDrawerParamList } from "../types";



export interface NotificationType{
    date:firebase.default.firestore.Timestamp,
    title:String,
    information:String,
    actionScreen:keyof(HomeDrawerParamList),
    actionScreenTitle:String,
    imageURL:String,


}