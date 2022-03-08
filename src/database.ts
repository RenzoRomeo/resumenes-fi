import axios from 'axios';

import { UserDB, FileDB } from './utils/types';

const BASE_URL = 'http://localhost:5000';

export const saveUser = async (uid: string, data: any) => {
  try {
    await axios.post(
      `${BASE_URL}/users/new`,
      {
        ...data,
        _id: uid,
        lastSeen: new Date(),
      }
    );
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
    await axios.delete(`${BASE_URL}/files/${fileId}`);
    await axios.post(`${BASE_URL}/users/${uid}/deletefile`, { fileId });
  } catch (error) {
    console.error(error);
  }
};

export const getAllFiles = async (page = 1, limit = 10) => {
  try {
    const {
      data: { docs: files, hasNextPage },
    } = await axios.get(`${BASE_URL}/files`, {
      params: { page, limit },
    });
    return { files, hasNextPage } as { files: FileDB[]; hasNextPage: boolean };
  } catch (error) {
    console.error(error);
  }
};

export const getUserFiles = async (uid: string, page = 1, limit = 10) => {
  try {
    const {
      data: { docs: files, hasNextPage },
    } = await axios.get(`${BASE_URL}/users/${uid}/files`, {
      params: { page, limit },
    });
    return { files, hasNextPage } as { files: FileDB[]; hasNextPage: boolean };
  } catch (error) {
    console.error(error);
  }
};
