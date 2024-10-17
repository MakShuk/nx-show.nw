import { IUserSettings } from '@show.nw/interfaces';
import { IsString } from 'class-validator';

export namespace AccountUserSettings {
  export const topic = 'account.user-settings.query';

  export class Request {
    @IsString()
    id: string;
  }

  export class Response {
    settings: IUserSettings;
  }
}
