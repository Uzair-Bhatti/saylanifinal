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
const logoutBtn = document.getElementById("logout");
const userImg = document.getElementById("uimage");
const searchBarBtn = document.getElementById("search");
const currentPageName = window.location.pathname.split("/").pop();
console.log(currentPageName);

///-- user data starts---///
const storeUserData = async (uid, displayName, photoURL, email) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    // Check if the user already exists
    if (!userSnapshot.exists()) {
      // If the user doesn't exist, add them to the "users" collection
      const userData = {
        displayName,
        photoURL,
        uid,
        email,
      };

      await setDoc(userRef, userData);
    }
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};
///--- user data ends----///

///---- write post start---///
const writePost = (e) => {
  e.preventDefault();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      const uid = user.uid;

      window.location.href = "createpost.html";

      // ...
    } else if (!user) {
      window.location.href = "login.html";
      alert("Please login first");
      // User is signed out
      // ...
    }
  });
};

writeBtn && writeBtn.addEventListener("click", writePost);
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

///---logout function start---///
const logout = () => {
  signOut(auth)
  .then(() => {
    // Sign-out successful.
    if(currentPage !=="index.html"){
      window.location.href="index.html"
    }
   console.log("signout")
  }).catch((error) => {
    // An error happened.
  });
};

logoutBtn && logoutBtn.addEventListener("click", logout);
///---loginBtn function end---///

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
  if (text.length <= maxLengh) {
    return text;
  }
  return text.slice(0, 100) + "....";
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

        const photoURL = blogEl.photoURL;
        const displayName = blogEl.displayName;

        const formattedTime = `${day}-${month}-${years}`;

        const truncatedDescription = truncateText(blogEl.description, maxLengh);

        return `
<div class="post">
            <div class="right">
                <h1>${blogEl.title}</h1>
             
                <p id="description-${docs.id}">${truncatedDescription}</p>
                 <button  class="read-more onclick="expandText('${
                   docs.id
                 }')">Read More</button>
                    <div class="detail">
                        <p>${(photoURL, displayName)}</p>
                        <p>${formattedTime}</p>
                    </div>
            </div> 
            <div class="left" style= "background-image: url(${
              blogEl.imageUrl
            }) "><a href=${blogEl.imageUrl}></a></div>
        </div>`;
      })
      .join("");
    post.innerHTML = Blogs;
  });
};
loadBlog();
///--- blog end---///

///---search  bar starts--////
searchBarBtn &&
  searchBarBtn.addEventListener("keyup", (event) => {
    const searchValue = event.target.value.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    let searchBarHTML = `<ul class="menu bg-base-200 w-56 rounded-box">`;
    blogEl.forEach((blogEl) => {
      const blogTitle = blogEl.title.toLowerCase(); // Convert to lowercase for case-insensitive comparison

      if (blogTitle.includes(searchValue)) {
        searchBarHTML += `<li><a>${blog.title}</a></li>`;
        // console.log(blog.title);
      }
    });
    searchBarHTML += `</ul>`;
    console.log(searchBarHTML);
  });
