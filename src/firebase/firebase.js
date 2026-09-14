// Import the functions you need from the SDKs you need
import { ref } from "vue"
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
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

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Detect if user is logged in
export const currentUser = ref(null);
export const userProfile = ref(null);
export const isAuthLoading = ref(true);

onAuthStateChanged(auth, async (user) => {
    currentUser.value = user;
    if (user) {
    try {
      // Look up the specific document inside 'UserInfo' matching user.uid
      const docRef = doc(db, "UserInfo", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        // Save the document data (e.g., { role: 'admin', firstName: 'John' })
        userProfile.value = docSnap.data(); 
      } else {
        console.warn(`No UserInfo document found for UID: ${user.uid}`);
        userProfile.value = { role: 'Standard User' }; // Safe fallback
      }
    } catch (error) {
      console.error("Error pulling from UserInfo:", error);
      userProfile.value = { role: 'Standard User' };
    }
  } else {
    userProfile.value = null;
  }
  
  isAuthLoading.value = false;
});


export const logoutUser = async () => {
  await signOut(auth);
};
