import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import type { FieldValue } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getBytes,
  StorageReference,
} from 'firebase/storage';

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
const storage = getStorage(app);

const signOut = () => {
  auth.signOut();
};

type User = {
  email: string;
  lastSeen: FieldValue;
  uid: string;
};

const saveUser = async (user: User) => {
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    lastSeen: user.lastSeen,
  });
};

const savePDF = (file: File, metadata: any) => {
  const storageRef = ref(storage, `files/${file.name}`);
  return uploadBytes(storageRef, file, metadata);
};

const getAllFiles = () => {
  const filesRef = ref(storage, 'files');
  return listAll(filesRef);
};

const getFile = (ref: StorageReference) => {
  return getBytes(ref);
};

export { db, auth, storage, signOut, saveUser, savePDF, getAllFiles };
