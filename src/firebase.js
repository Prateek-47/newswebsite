import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, equalTo, orderByChild, query} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlNMe3UgXBev8OU9VrLqMr7a4SRKEkWic",
  authDomain: "huuganews-a162d.firebaseapp.com",
  databaseURL: "https://huuganews-a162d-default-rtdb.firebaseio.com",
  projectId: "huuganews-a162d",
  storageBucket: "huuganews-a162d.appspot.com",
  messagingSenderId: "76055766751",
  appId: "1:76055766751:web:952f3c10511640e5dd2b6a"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, get, equalTo, orderByChild, query }; // Export required methods