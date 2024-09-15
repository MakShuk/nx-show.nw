export enum UserRole {
  admin = 'admin',
  user = 'user',
}

export interface IUser {
  _id?: string;
  displayName: string;
  passwordHash: string;
  role: UserRole;
  email: string;
}
