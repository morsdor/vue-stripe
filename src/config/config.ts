import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "----",
  authDomain: "stripe-tutorial-bytepad.firebaseapp.com",
  projectId: "stripe-tutorial-bytepad",
  storageBucket: "stripe-tutorial-bytepad.appspot.com",
  messagingSenderId: "----",
  appId: "---",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore };
