import { IUser, IUserSettings, UserRole } from '@show.nw/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';
import { Types } from 'mongoose';

export class UserEntity implements IUser {
  _id?: string;
  displayName: string;
  passwordHash: string;
  role: UserRole;
  email: string;
  settings?: IUserSettings;

  constructor(user: IUser) {
    this._id = new Types.ObjectId().toString();
    this.passwordHash = user.passwordHash;
    this.displayName = user.displayName;
    this.role = user.role;
    this.email = user.email;
    this.settings = user.settings;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }

  public getPublicProfile() {
    return {
      displayName: this.displayName,
      role: this.role,
      email: this.email,
    };
  }

  public updateProfile(displayName: string) {
    this.displayName = displayName;
    return this;
  }
}
