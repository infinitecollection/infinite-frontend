import { initializeApp, getApps, getApp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getFirestore } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getAuth } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getStorage } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDR-V1oL6mEtmc1C_9CmqaNXYnBdJtGT_0",
  authDomain: "infinitecollection-38c7c.firebaseapp.com",
  projectId: "infinitecollection-38c7c",
  storageBucket: "infinitecollection-38c7c.appspot.com",
  messagingSenderId: "1040493303090",
  appId: "1:1040493303090:web:15ca027c4bae6473fe732b"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);