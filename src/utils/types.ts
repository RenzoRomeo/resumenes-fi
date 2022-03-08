export interface UserDB {
  _id: string;
  email: string;
  name: string;
  lastName: string;
  lastSeen?: Date;
  files?: string[];
}

export interface FileDB {
  _id: string;
  path: string;
  name: string;
  url: string;
  subject: string;
  uid: string;
}
