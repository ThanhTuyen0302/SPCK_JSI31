// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore-lite.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9BuVhxL6d4Rx-9xEpLIeLqKTD3xfIOok",
  authDomain: "jsi31-2a2dc.firebaseapp.com",
  databaseURL:
    "https://jsi31-2a2dc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jsi31-2a2dc",
  storageBucket: "jsi31-2a2dc.firebasestorage.app",
  messagingSenderId: "687112098642",
  appId: "1:687112098642:web:d4a31e8eb5613c652b608b",
  measurementId: "G-835WFXLCXY",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
