import { UserDB, FileDB } from './types';

const BASE_URL = 'http://localhost:5000';

export const saveUser = async (uid: string, data: any) => {
  try {
    await fetch(`${BASE_URL}/users/new`, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        _id: uid,
        lastSeen: new Date().toISOString(),
      }),
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
    await fetch(`${BASE_URL}/users/${uid}/update`, {
      method: 'POST',
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

export const saveFile = async (uid: string, data: FileDB) => {
  try {
    const { id: fileId } = await fetch(`${BASE_URL}/files/new`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    await fetch(`${BASE_URL}/users/${uid}/addfile`, {
      method: 'POST',
      body: JSON.stringify({ fileId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteFile = async (uid: string, fileId: string) => {
  try {
    await fetch(`${BASE_URL}/files/${fileId}`, {
      method: 'DELETE',
    });
    await fetch(`${BASE_URL}/users/${uid}/deletefile`, {
      method: 'POST',
      body: JSON.stringify({ fileId }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllFiles = async () => {
  try {
    const files: FileDB[] = await fetch(`${BASE_URL}/files`).then((res) =>
      res.json()
    );
    return files;
  } catch (error) {
    console.error(error);
  }
};

export const getUserFiles = async (uid: string) => {
  try {
    const files: FileDB[] = await fetch(`${BASE_URL}/users/${uid}/files`).then(
      (res) => res.json()
    );
    return files;
  } catch (error) {
    console.error(error);
  }
};
