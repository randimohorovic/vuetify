import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbgpw7AoDZ3MdjBm3GH7cA96JrHFq5awQ",
  authDomain: "projekt1-8e9f6.firebaseapp.com",
  projectId: "projekt1-8e9f6",
  storageBucket: "projekt1-8e9f6.appspot.com",
  messagingSenderId: "102783501016",
  appId: "1:102783501016:web:bace5e5348d938e777cdad",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

// firestore
let db = firebase.firestore();
// za autent firebase.auth() , zabazu firebase.data idk ...
//storage za firebaase
let storage = firebase.storage();

//moramoexportat firebase na sva mjesta u apk di treba

export { firebase, db, storage };
//ili samo firebase, -> skraceno je kad je isti kljuc i vrijednost
