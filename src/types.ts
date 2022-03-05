export interface UserDB {
  email: string;
  name: string;
  lastName: string;
  _id: string;
  lastSeen?: Date;
  files?: string[];
}

export interface FileDB {
  name: string;
  url: string;
  subject: string;
  uid: string;
}
