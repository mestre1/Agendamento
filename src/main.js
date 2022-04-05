import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import firebase from "firebase/app";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgfGFt7x9ZegEVKDSYB_mrAKObDjrq1b0",
  authDomain: "backend-agendamento.firebaseapp.com",
  projectId: "backend-agendamento",
  storageBucket: "backend-agendamento.appspot.com",
  messagingSenderId: "897405766656",
  appId: "1:897405766656:web:4455f9098c4fc6249e5ce5"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
