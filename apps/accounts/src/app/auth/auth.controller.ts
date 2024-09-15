import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountLogin } from '@show.nw/contracts';
import { AccountRegister } from '@show.nw/contracts';
import { RMQRoute } from 'nestjs-rmq';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @RMQRoute(AccountLogin.topic)
  async login(
    @Body() loginDto: AccountLogin.Request
  ): Promise<AccountLogin.Response> {
    const { id } = await this.authService.validateUser(
      loginDto.email,
      loginDto.password
    );
    return this.authService.login(id);
  }

  @RMQRoute(AccountRegister.topic)
  async register(
    @Body() registerDto: AccountRegister.Request
  ): Promise<AccountRegister.Response> {
    return this.authService.register(registerDto);
  }
}
