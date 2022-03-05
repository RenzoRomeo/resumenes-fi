import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { saveFile, saveUser } from './database';

const firebaseConfig = {
  apiKey: 'AIzaSyDt9KI0I7kI5HN0dnIL73sc24Q2XCtfZ6E',
  authDomain: 'resumenes-fi.firebaseapp.com',
  projectId: 'resumenes-fi',
  storageBucket: 'resumenes-fi.appspot.com',
  messagingSenderId: '922520729907',
  appId: '1:922520729907:web:ab343980a7189510d4a646',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const signUp = (email: string, password: string, data: any) => {
  createUserWithEmailAndPassword(auth, email, password).then((res) =>
    saveUser(res.user.uid, data)
  );
};

export const signOut = () => {
  auth.signOut();
};

export const savePDF = async (file: File, uid: string, subject: string) => {
  try {
    const storageRef = ref(storage, `files/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    await saveFile(uid, {
      name: snapshot.ref.name,
      uid,
      subject,
      url: await getDownloadURL(snapshot.ref),
    });
  } catch (error) {
    console.error(error);
  }
};
