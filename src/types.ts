export interface User {
  email: string;
  name: string;
  lastName: string;
  _id: string;
  lastSeen?: Date;
  files?: string[];
}

export interface File {
  name: string;
  url: string;
  subject: string;
  uid: string;
}
