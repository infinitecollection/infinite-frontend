// auth.js
import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ======================
   SIGN UP
====================== */
const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    const msg = document.getElementById("signupMsg");

    if (!name || !email || !password) {
      msg.innerText = "All fields required";
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email,
        createdAt: serverTimestamp(),
        isAdmin: false
      });

      window.location.href = "shop.html";

    } catch (error) {
      msg.innerText = error.message;
    }
  });
}

/* ======================
   LOGIN
====================== */
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const msg = document.getElementById("loginMsg");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "shop.html";
    } catch (error) {
      msg.innerText = "Invalid email or password";
    }
  });
}

/* ======================
   LOGOUT
====================== */
window.logout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};
