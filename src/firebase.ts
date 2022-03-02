import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDt9KI0I7kI5HN0dnIL73sc24Q2XCtfZ6E',
  authDomain: 'resumenes-fi.firebaseapp.com',
  projectId: 'resumenes-fi',
  storageBucket: 'resumenes-fi.appspot.com',
  messagingSenderId: '922520729907',
  appId: '1:922520729907:web:ab343980a7189510d4a646',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
