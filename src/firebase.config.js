import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCDoEtF335ks1i-7WssuMiE-YCbId2MlEo",
  authDomain: "fir-chat-app-6f684.firebaseapp.com",
  projectId: "fir-chat-app-6f684",
  storageBucket: "fir-chat-app-6f684.appspot.com",
  messagingSenderId: "161545955731",
  appId: "1:161545955731:web:09a65988300caa1e992066"
};

firebase.initializeApp(firebaseConfig);
export const Auth= firebase.auth();
export default firebase;
