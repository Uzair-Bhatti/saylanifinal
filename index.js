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
const post = (e) => {
  e.preventDefault();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      const uid = user.uid;
      if (currentPageName !== "" && currentPageName !== "createpost.html") {
        window.location.href = "createpost.html";
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

writeBtn && writeBtn.addEventListener("click", post);
///---- write post end----///

const checkLogin2 = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(auth.currentUser);
    } else {
    }
  });
};

checkLogin2();

///---loginBtn function start---///
const login = () => {
  if (currentPageName === "index.html") {
    window.location.href = "login.html";
  }
};

loginBtn && loginBtn.addEventListener("click", login);
///---loginBtn function ---///

///---- blog start----///
const blogHead = document.getElementById("postHead");
let currentPostId;
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Nov",
  "Dec",
];
const maxLengh = 100;

const truncateText = (text, maxLengh) => {
  if (text.length <= 70) {
    return text;
  }
  return text.slice(0, 70) + "....";
};

const loadBlog = () => {
  const q = query(collection(db, "Blogs"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const Blogs = querySnapshot.docs
      .map((docs) => {
        let blogEl = docs.data();

        let date = new Date(blogEl.date);

        let day = date.getDate();

        let month = months[date.getMonth()];

        let years = date.getFullYear();

        const formattedTime = `${day}-${month}-${years}`;

        const truncatedDescription = truncateText(blogEl.description, 100);

        return `
<div class="post">
            <div class="right">
                <h1>${blogEl.title}</h1>
             
                <p id="description-${docs.id}">${truncatedDescription}</p>
                 <button  class="read-more onclick="expandText('${docs.id}')">Read More</button>
                    <div class="detail">
                        <p>${blogEl.userName}</p>
                        <p>${formattedTime}</p>
                    </div>
            </div> 
            <div class="left" style= "background-image: url(${blogEl.imageUrl}) "><a href=${blogEl.imageUrl}></a></div>
        </div>`;
      })
      .join("");

    blogHead.innerHTML = Blogs;
  });
};
loadBlog();
