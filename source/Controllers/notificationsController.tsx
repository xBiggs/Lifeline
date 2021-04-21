import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { TouchableWithoutFeedbackComponent } from "react-native";
import { Platform } from "react-native";

// TODO: Make this a class with static methods for Facade design pattern

export async function schedulePushNotification(
  title: string,
  body: string,
  data: string,
  seconds: number
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data },
    },
    trigger: { seconds: seconds },
  });
}

export async function scheduleRecurringPushNotification(
  title: string,
  body: string,
  data: string,
  seconds: number
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data },
    },
    trigger: {
      seconds: seconds,
      repeats: true,
    },
  });
}

export async function cancelNotifications() {
  Notifications.cancelAllScheduledNotificationsAsync();
}

export async function sendPushNotification(expoPushToken: any) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
export function getSecondsBetweenDates(t1: Date, t2: Date) {
  var dif = t1.getTime() - t2.getTime();

  var Seconds_from_T1_to_T2 = dif / 1000;
  var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
  return Seconds_Between_Dates;
}
export async function registerForPushNotificationsAsync():Promise<string> {
  let token: string|undefined;

  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();


    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }


    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      token = undefined;
      
    }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  
 
  }
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  
  if(token) return token;
  else throw new Error("Failed to get push token for push notification!")


  
  

  
}
