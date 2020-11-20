import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAa70Oox8W9sG2J4IRrUGgqp2nZ6wGwDtM",
    authDomain: "skooly-alpha.firebaseapp.com",
    databaseURL: "https://skooly-alpha.firebaseio.com",
    projectId: "skooly-alpha",
    storageBucket: "skooly-alpha.appspot.com",
    messagingSenderId: "7580688566",
    appId: "1:7580688566:web:4c3153526d479342ad8617",
    measurementId: "G-E2B21VQCPW"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//user config file
var uiConfig = {
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

const db = firebase.firestore();
const auth = firebase.auth();
const store = firebase.firestore
const timestamp = firebase.firestore.FieldValue.serverTimestamp;


export { db, auth, uiConfig, timestamp, store };