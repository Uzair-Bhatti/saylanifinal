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
  where,
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
///---- CLOSE ----///

///---- get elements from html ----///
const currentPageName = window.location.pathname.split("/").pop();
console.log(currentPageName);

///----blog section starts----///
const blogStart = document.getElementById("postSection");
console.log(blogStart);

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const loadBlog = () => {
  const q = query(collection(db, "Blogs"));
  const unsubscribe = onSnapshot(q, (querySnapchot) => {
    const Blogs = querySnapchot.docs.map((docs) => {
      const blogEl = docs.data();
      let date = new Date(blogEl.date);

      const day = date.getDate();
      const month = months[date.getMonth()];
      const years = date.getFullYear();

      const formattedTime = `${day}-${month}-${years}`;

      console.log(blogEl);
    });
    join(",");

    blogHead.innerHTML = Blogs;
  });
};
loadBlog();

const checkLogin = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loadBlog(user);
    } else {
    }
  });
};
checkLogin();
