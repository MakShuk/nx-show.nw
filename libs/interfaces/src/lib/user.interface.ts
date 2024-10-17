export enum UserRole {
  admin = 'admin',
  user = 'user',
}

export enum PurchaseState {
  Started = 'Started',
  WaitingForPayment = 'WaitingForPayment',
  Purchased = 'Purchased',
  Cancelled = 'Cancelled',
}

export interface IUser {
  _id?: string;
  displayName: string;
  passwordHash: string;
  role: UserRole;
  email: string;
  settings?: IUserSettings;
}

export interface IUserSettings {
  status: string;
  purchaseState: PurchaseState;
  endDate: Date;

}