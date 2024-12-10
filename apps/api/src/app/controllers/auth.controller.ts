import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AccountLogin } from '@show.nw/contracts';
import { AccountRegister } from '@show.nw/contracts';
import { IPublishOptions, RMQService } from 'nestjs-rmq';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      //return await this.sendRegisterRequest(dto);
      return await this.handleRMQRouteError(() =>
        this.sendRegisterRequest(dto)
      );
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      return await this.sendLoginRequest(dto);
      /*      return await this.handleRMQRouteError(() => this.sendLoginRequest(dto)); */
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }


  private async sendRegisterRequest(
    dto: RegisterDto
  ): Promise<AccountRegister.Response> {
    const options: IPublishOptions = {};
    return await this.rmqService.send<
      AccountRegister.Request,
      AccountRegister.Response
    >(AccountRegister.topic, dto, options);
  }

  private async sendLoginRequest(
    dto: LoginDto
  ): Promise<AccountLogin.Response> {
    return this.rmqService.send<AccountLogin.Request, AccountLogin.Response>(
      AccountLogin.topic,
      dto
    );
  }

  private async handleRMQRouteError<T>(fn: () => Promise<T>): Promise<T> {
    let i = 1;
    try {
      return await fn();
    } catch (e) {
      if (
        i > 0 &&
        e instanceof Error &&
        e.message === `Requested service doesn't have RMQRoute with this path`
      ) {
        console.warn('Retrying...');
        i--;
        return await fn();
      }
      throw e;
    }
  }
}
