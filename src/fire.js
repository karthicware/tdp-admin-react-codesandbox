import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBX67_tiAE17OCAnMb7SLgl4KUeR4uov7I",
  authDomain: "tdpapp-37130.firebaseapp.com",
  databaseURL: "https://tdpapp-37130.firebaseio.com",
  projectId: "tdpapp-37130",
  storageBucket: "tdpapp-37130.appspot.com",
  messagingSenderId: "824305602673"
};
var fire = firebase.initializeApp(config);
export default fire;
