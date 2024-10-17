import { Body, Controller } from '@nestjs/common';
import { AccountUserSettings, AccountUserInfo } from '@show.nw/contracts';
import { RMQValidate, RMQRoute } from 'nestjs-rmq';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './user.entity/user.entity';

@Controller()
export class UserQueries {
  constructor(private readonly userRepository: UserRepository) {}

  @RMQValidate()
  @RMQRoute(AccountUserInfo.topic)
  async userInfo(
    @Body() { id }: AccountUserInfo.Request
  ): Promise<AccountUserInfo.Response> {
    const user = await this.userRepository.findUserById(id);
    const profile = new UserEntity(user).getPublicProfile();
    return {
      profile,
    };
  }

  @RMQValidate()
  @RMQRoute(AccountUserSettings.topic)
  async userSettings(
    @Body() { id }: AccountUserSettings.Request
  ): Promise<AccountUserSettings.Response> {
    const user = await this.userRepository.findUserById(id);
    return {
      settings: user.settings,
    };
  }
}
