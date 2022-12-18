const signUpBtn = document.querySelector("#signUp");
const signInBtn = document.querySelector("#signIn");
const signOutBtn = document.querySelector("#signOut");
const sendDataBtn = document.querySelector("#sendData");
const getDataBtn = document.querySelector("#getData");

const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const inputID = document.querySelector("#id");
const inputImage = document.querySelector("#image");
const inputDescription = document.querySelector("#description");

const currentUserEl = document.querySelector("#hello");

let currentUser;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKOwxFhUwAkGKZT941B-P0ZdF1CR5peoo",
  authDomain: "test-1-8d3d9.firebaseapp.com",
  projectId: "test-1-8d3d9",
  storageBucket: "test-1-8d3d9.appspot.com",
  messagingSenderId: "424521545586",
  appId: "1:424521545586:web:baa719b1045134a9960feb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ==================== AUTH ===========================

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);

signUpBtn.addEventListener('click', signUserUp);
signInBtn.addEventListener('click', signUserIn);
signOutBtn.addEventListener('click', signUserOut);


function signUserUp() {

    createUserWithEmailAndPassword(auth, inputEmail.value, inputPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    
}

function signUserIn() {

    signInWithEmailAndPassword(auth, inputEmail.value, inputPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
    
}

function signUserOut() {

    signOut(auth).then(() => {
}).catch((error) => {
});
    
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    
      const uid = user.uid;
    currentUserEl.textContent = `Hello, ${user.email}`;
    currentUser = user.email;

  } else {
      
    currentUserEl.textContent = 'NO ACTIVE USER';
    currentUser = '';
  }
});

// ========================= FIRESTORE =================================

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const db = getFirestore(app);

sendDataBtn.addEventListener('click', sendData);
getDataBtn.addEventListener('click', getData);

async function sendData() {

  await setDoc(doc(db, "Marakas", currentUser), {
      
    [inputID.value]: {
      image: inputImage.value,
      description: inputDescription.value
    }
  
    }, { merge: true }
    
    );
}

async function getData() {

  const docRef = doc(db, "Marakas", currentUser);
  const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

}