///-----firebase initialization starts-----///
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

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
const storage = getStorage(app);
///---- CLOSE ----///

///---get elements from html---///
const userName = document.getElementById("uemail");
const fileImage = document.getElementById("file");
const saveBtn = document.getElementById("save");
const cancelBtn = document.getElementById("cancel");

const currentPageName = window.location.pathname.split("/").pop();
console.log(currentPageName);

///----image upload start---///
const imageUpload = () => {
  return new Promise((resolve, reject) => {
    const image = fileImage.files[0];

    if (!file) {
      reject(new Error("No file is found"));
      return;
    }

    const metaData = {
      name: image.name,
      size: image.size,
      type: image.type,
    };

    const imageName = `${image.name} _ ${Date.now()}`;
    const storageRef = ref(storage, `images/ ` + imageName);
    const imageUpload = uploadBytesResumable(storageRef, image, metaData);
    imageUpload.on(
      "state_changed",
      (snapshot) => {
        // Track upload progress if needed
      },
      (error) => {
        reject(error); // Reject promise on upload error
      },
      () => {
        getDownloadURL(imageUpload.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL); // Resolve promise with download URL
          })
          .catch((error) => {
            reject(error); // Reject promise if getting download URL fails
          });
      }
    );
  });
};

///----image upload end---///

///--- blog function start ----///
const createBlog = async () => {
  const user = auth.currentUser;
  let typeVal = null;
  let statusVal = null;

  ///---- Get title Value---->

  const title = document.getElementById("title");
  const titleVal = title.value;
  console.log(titleVal);

  ///---- value checked for category ----///

  let selection = document.getElementById("category");
  let status = selection.value;
  console.log(status);

  ///-----value check for type -----///

  const typeValRadio = document.getElementsByName("type");
  for (let i = 0; i < typeValRadio.length; i++) {
    if (typeValRadio[i].checked) {
      typeVal = typeValRadio[i].value;
      console.log(typeVal);
    }
  }

  ///-----value checked for status----///

  const radioBtnValue = document.getElementsByName("status");
  for (let i = 0; i < radioBtnValue.length; i++) {
    if (radioBtnValue[i].checked) {
      statusVal = radioBtnValue[i].value;
      console.log(statusVal);
    }
  }

  ///---- Get value of description  ----///

  let blog = document.getElementById("blog");
  let blogVal = blog.value;

  ///--- Get Image from database----///

  let imageUrl;
  try {
    imageUrl = await imageUpload();
  } catch (error) {
    console.error("Error uploading image:", error);
    return; // Exit function if image upload fails
  }

  ///----- Get username ---///

  const checkLogin2 = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // storeUserData(user.uid, user.displayName, user.photoURL, user.email);
        const uid = user.uid;
        console.log(auth.currentUser);
        // ...
      } else {
        // User is signed out
      }
    });
  };

  checkLogin2();

  const id = new Date().getTime();
 
    const payload = {
      id: id,
      title: titleVal,
      option: status,
      typeValue: typeVal,
      statusValue: statusVal,
      blog: blogVal,
      imageUrl: imageUrl,
      date: id,
      userName: auth.currentUser.displayName,
      photoURL: user.photoURL,
    };

    // await setDoc(doc(db, "Blogs", `${id}`), payload)
    try {
      await setDoc(doc(db, "Blogs", `${id}`), payload);
      alert("Successfully upload");
      window.location.href = "index.html"; //change with blog page
      titleVal = "";
      status = "";
    } catch (error) {
      console.error("Error writing blog to Firestore:", error);
    }
};

saveBtn && saveBtn.addEventListener("click", createBlog);
///----- blog function end----///

// Redirect to index.html
cancelBtn &&
  cancelBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
