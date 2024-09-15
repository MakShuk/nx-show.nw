export namespace AccountLogin {
  export const topic = 'account.login.login';
  export class Request {
    email: string;
    password: string;
    displayName: string;
  }

  export class Response {
    access_token: string;
  }
}
