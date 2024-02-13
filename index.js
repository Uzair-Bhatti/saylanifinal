import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAr0lHVrhWgZ2b0TdQG-bf43A_WlopMG5c",
  authDomain: "saylani-final-project.firebaseapp.com",
  projectId: "saylani-final-project",
  storageBucket: "saylani-final-project.appspot.com",
  messagingSenderId: "337880279723",
  appId: "1:337880279723:web:fe612764e7b4c4487ea5ee",
  measurementId: "G-2ZKRJL5ZD3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const togglePassword = document.getElementById("toggle-password");
const passwordField = document.getElementById("password-field");

togglePassword.addEventListener("click", function () {
  // Toggle the type attribute between "password" and "text"
  const type = passwordField.type === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);

  // Update the icon based on the new type
  this.classList.toggle("fa-eye-slash");
});
