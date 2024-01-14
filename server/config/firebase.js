// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBidEFNBJtmKBi2jH2sM2P8JOxMXhzrZJ0",
    authDomain: "certifylink.firebaseapp.com",
    projectId: "certifylink",
    storageBucket: "certifylink.appspot.com",
    messagingSenderId: "1097801381603",
    appId: "1:1097801381603:web:4917eec2ef46d7e62db7d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
module.exports = { app, storage }