import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export namespace AccountRegister {
  export const topic = 'account.register.command';
  export class Request {
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8)
    @MaxLength(40)
    password: string;
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    displayName: string;
  }

  export class Response {
    email: string;
  }
}
