import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export namespace AccountLogin {
  export const topic = 'account.login.command';
  export class Request {
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8)
    @MaxLength(40)
    password: string;

    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    displayName?: string;
  }

  export class Response {
    access_token: string;
  }
}
