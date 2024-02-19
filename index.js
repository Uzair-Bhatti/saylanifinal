///-----firebase initialization starts-----///
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAr0lHVrhWgZ2b0TdQG-bf43A_WlopMG5c",
  authDomain: "saylani-final-project.firebaseapp.com",
  projectId: "saylani-final-project",
  storageBucket: "saylani-final-project.appspot.com",
  messagingSenderId: "337880279723",
  appId: "1:337880279723:web:654d7e17050bed447ea5ee",
  measurementId: "G-WRT49Q3WR1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const chatCollectionRef = collection(db, "chats");
///---- CLOSE ----///

///---get elements from html---///
const searchfield = document.getElementById("search");
const writeBtn = document.getElementById("write");
const loginBtn = document.getElementById("login");
const currentPageName = window.location.pathname.split("/").pop();
console.log(currentPageName);

///---- write post start---///
const writePost = (e) => {
  e.preventDefault();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      const uid = user.uid;
      if(currentPageName !== "createpost.html"){
        window.location.href = "createpost.html"
      }

      // ...
    } else {
      window.location.href = "login.html";
      alert("Please login first");
      // User is signed out
      // ...
    }
  });
};

writeBtn && writeBtn.addEventListener("click", writePost);
///---- write post end----///

///---loginBtn function start---///
