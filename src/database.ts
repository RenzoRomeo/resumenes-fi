import axios from 'axios';

import { deletePDF } from './firebase';
import { UserDB, FileDB } from './types';

const BASE_URL = 'http://localhost:5000';

export const saveUser = async (uid: string, data: any) => {
  try {
    await axios.post(`${BASE_URL}/users/new`, {
      ...data,
      _id: uid,
      lastSeen: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (uid: string, data: any) => {
  try {
    await axios.post(`${BASE_URL}/users/${uid}/update`, data);
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (uid: string) => {
  try {
    const { data: user } = await axios.get(`${BASE_URL}/users/${uid}`);
    return user as UserDB;
  } catch (error) {
    console.error(error);
  }
};

export const saveFile = async (uid: string, data: any) => {
  try {
    const {
      data: { id: fileId },
    } = await axios.post(`${BASE_URL}/files/new`, data);
    await axios.post(`${BASE_URL}/users/${uid}/addfile`, { fileId });
  } catch (error) {
    console.error(error);
  }
};

export const deleteFile = async (uid: string, fileId: string) => {
  try {
    const {
      data: { path },
    } = await axios.delete(`${BASE_URL}/files/${fileId}`);
    await deletePDF(path);
    await axios.post(`${BASE_URL}/users/${uid}/deletefile`, { fileId });
  } catch (error) {
    console.error(error);
  }
};

export const getAllFiles = async () => {
  try {
    const { data: files } = await axios.get(`${BASE_URL}/files`);
    return files as FileDB[];
  } catch (error) {
    console.error(error);
  }
};

export const getUserFiles = async (uid: string) => {
  try {
    const { data: files } = await axios.get(`${BASE_URL}/users/${uid}/files`);
    return files as FileDB[];
  } catch (error) {
    console.error(error);
  }
};
