import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmOekmcPnRMpbxFYk2trhLom0azqlOq5U",
  authDomain: "stripe-tutorial-bytepad.firebaseapp.com",
  projectId: "stripe-tutorial-bytepad",
  storageBucket: "stripe-tutorial-bytepad.appspot.com",
  messagingSenderId: "313149183581",
  appId: "1:313149183581:web:af390beb1d96adac561fb4",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore };
