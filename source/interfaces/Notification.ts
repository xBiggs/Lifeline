import { ActionSheetIOS } from "react-native";
import { Image } from "react-native-svg";

export interface NotificationType{
    date:Date,
    title:String,
    information:String,
    actionScreen:String,
    actionScreenTitle:String,
    imageURL:String,


}