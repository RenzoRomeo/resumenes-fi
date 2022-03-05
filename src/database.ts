import { UserDB, File } from './types';

const BASE_URL = 'http://localhost:5000';

export const saveUser = async (uid: string, data: any) => {
  try {
    await fetch(`${BASE_URL}/users/new`, {
      method: 'POST',
      body: JSON.stringify({ ...data, _id: uid, lastSeen: new Date().toISOString() }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (uid: string, data: any) => {
  try {
    await fetch(`${BASE_URL}/users/update/${uid}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (uid: string) => {
  try {
    const user: UserDB = await fetch(`${BASE_URL}/users/${uid}`).then((res) =>
      res.json()
    );
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const saveFile = async (uid: string, data: File) => {
  try {
    const { id } = await fetch(`${BASE_URL}/files/new`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    await fetch(`${BASE_URL}/users/addfile/${uid}`, {
      method: 'PUT',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllFiles = async () => {
  try {
    const files: File[] = await fetch(`${BASE_URL}/files`).then((res) =>
      res.json()
    );
    return files;
  } catch (error) {
    console.error(error);
  }
};
