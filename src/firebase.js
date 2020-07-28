import firebase from "firebase";

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyAKc0P8Qxfpb7ClHcfvNdV9p_1kMvp5Vok",
    authDomain: "justdoittoday-37593.firebaseapp.com",
    databaseURL: "https://justdoittoday-37593.firebaseio.com",
    projectId: "justdoittoday-37593",
    storageBucket: "justdoittoday-37593.appspot.com",
    messagingSenderId: "1071762001364",
    appId: "1:1071762001364:web:ab9dc6735e67d664eada41",
    measurementId: "G-G511QE1H4X"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  
  export {db, auth, storage};