import fire from "../fire";

export async function fetchAllUserInfo() {
  //console.log(`fetchAllUserInfo()`);
  let usersArr = [];
  const ref = fire.database().ref("users");
  const snapshot = await ref.once("value");
  if (snapshot.val()) usersArr = snapshot.val();
  return usersArr;
}

export async function fetchUserInfo(mobile) {
  //console.log(`fetchAllUserInfo()`);
  let userInfo = {};
  const userRef = fire.database().ref(`users/${mobile}`);
  const snapshot = await userRef.once("value");
  if (snapshot.val()) userInfo = snapshot.val();
  //console.log(`fetchUserInfo-userInfo=${JSON.stringify(userInfo)})`);
  return userInfo;
}
