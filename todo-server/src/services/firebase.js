const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyBSptmCSkYFmryPlj7fIeZORbl3BIlJ9eU",
  authDomain: "todo-database-bxnerd.firebaseapp.com",
  databaseURL: "https://todo-database-bxnerd-default-rtdb.firebaseio.com",
  projectId: "todo-database-bxnerd",
  storageBucket: "todo-database-bxnerd.appspot.com",
  messagingSenderId: "1045610022272",
  appId: "1:1045610022272:web:2e4f2b1fafe01eb040ad65",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

module.exports = firebase;
