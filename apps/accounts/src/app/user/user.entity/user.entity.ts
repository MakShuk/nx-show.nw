import { IUser, UserRole } from "@show.nw/interfaces";
import { compare, genSalt, hash } from 'bcryptjs';

export  class UserEntity implements IUser {
  _id?: string;
  displayName: string;
  passwordHash: string;
  role: UserRole;
  email: string;

  constructor(user: IUser) {
    this._id = user._id;
    this.passwordHash = user.passwordHash;
    this.displayName = user.displayName;
    this.role = user.role;
    this.email = user.email;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }
}
 