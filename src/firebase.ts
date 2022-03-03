import { initializeApp } from 'firebase/app';
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  StorageReference,
  getMetadata,
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
export const db = getFirestore(app);
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

export const saveUser = async (uid: string, data: any) => {
  await setDoc(doc(db, 'users', uid), data);
};

export const updateUser = (uid: string, data: any) => {
  const userRef = doc(db, 'users', uid);
  try {
    updateDoc(userRef, data);
  } catch (err) {
    console.error(err);
  }
};

export const addFileToUser = (uid: string, path: string) => {
  const userRef = doc(db, 'users', uid);
  updateDoc(userRef, {
    files: arrayUnion(path),
  });
};

export const savePDF = (file: File, metadata: any, uid: string) => {
  const storageRef = ref(storage, `files/${file.name}`);
  addFileToUser(uid, storageRef.fullPath);
  return uploadBytes(storageRef, file, metadata);
};

export const getAllFiles = () => {
  const filesRef = ref(storage, 'files');
  return listAll(filesRef);
};

export const getFile = (ref: StorageReference) => {
  const URL = getDownloadURL(ref);
  return URL;
};

export const getFileMetadata = (ref: StorageReference) => {
  return getMetadata(ref);
};

export const getUser = (uid: string) => {
  const userRef = doc(db, 'users', uid);
  return getDoc(userRef);
};
