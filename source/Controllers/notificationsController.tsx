import Constants from "expo-constants";
import { TouchableWithoutFeedbackComponent } from "react-native";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

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
 await Notifications.cancelAllScheduledNotificationsAsync();
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
export async function askPermissions (){
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return false;
  }
  return true;
};
