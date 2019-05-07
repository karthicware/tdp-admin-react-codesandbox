import Expo from "expo-server-sdk";

import { fetchAllUserInfo, fetchUserInfo } from "./user-service";

export async function sendPushNotificationToAll(msg) {
  let expo = new Expo();
  let messages = [];
  const somePushTokens = await fetchAllPushTokens();
  //console.log(`somePushTokens=${JSON.stringify(somePushTokens)}`);
  for (let pushToken of somePushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messages.push({
      to: pushToken,
      sound: "default",
      body: msg,
      data: { withSome: "data" }
    });
  }
  //console.log(`messages=${JSON.stringify(messages)}`);
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        //console.log(`chunk=${JSON.stringify(chunk)}`);
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(`ticketChunk=${ticketChunk}`);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
      } catch (error) {
        console.error(`Error in retrieving chunks = ${error}`);
      }
    }
  })();
}

async function fetchAllPushTokens() {
  //console.log(`fetchAllPushTokens()`);
  let pushTokensArr = [];
  const usersArr = await fetchAllUserInfo();
  //console.log(`usersArr=${JSON.stringify(usersArr)}`);
  Object.entries(usersArr).forEach(user => {
    //console.log(`user=${JSON.stringify(user)}`);
    const [key, value] = user;
    //console.log(`value=${JSON.stringify(value)}`);
    if (value.pushTokenKey) pushTokensArr.push(value.pushTokenKey);
  });
  //console.log(`pushTokensArr=${JSON.stringify(pushTokensArr)}`);
  return pushTokensArr;
}

export async function sendPushNotification(mobile, title, body) {
  const userInfo = await fetchUserInfo(mobile);
  console.log(`sendPushNotification-userInfo=${JSON.stringify(userInfo)}`);
  return fetch("https://expo.io/--/api/v2/push/send", {
    body: JSON.stringify([
      {
        to: userInfo.pushTokenKey,
        title: title,
        body: body,
        data: { message: `${title} - ${body}` }
      }
    ]),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
}
