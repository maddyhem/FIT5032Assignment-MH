import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'


const app = createApp(App)

app.use(router)
app.mount('#app')

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP5HrJ7QW_Pp-6H0KOJMcg-VFN086g1C0",
  authDomain: "fit5032-assignment-1cefe.firebaseapp.com",
  projectId: "fit5032-assignment-1cefe",
  storageBucket: "fit5032-assignment-1cefe.firebasestorage.app",
  messagingSenderId: "578757617940",
  appId: "1:578757617940:web:607509383402d29c367a01"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);