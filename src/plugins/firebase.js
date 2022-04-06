import Vue from "vue";
import * as firebase from "firebase/app";
//import store from "../store";

const firebaseConfig = {
  apiKey: "AIzaSyAK23k2JUveHayBjPCt0_I7pzjwn1rX-Sc",
  authDomain: "agendamento-teste-6c7d0.firebaseapp.com",
  projectId: "agendamento-teste-6c7d0",
  storageBucket: "agendamento-teste-6c7d0.appspot.com",
  messagingSenderId: "908663622589",
  appId: "1:908663622589:web:65a718b1566399d9ac60d4",
  measurementId: "G-RSNQH0XLJX",
};

firebase.initializeApp(firebaseConfig);

//firebase.auth().onAuthStateChanged((user) => {
//store.dispatch("addUser", { name: user.displayName, email: user.email });
//});

Vue.prototype.$firebase = firebase;

export default firebase;
