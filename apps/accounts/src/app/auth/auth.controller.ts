import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountLogin } from '@show.nw/contracts';
import { AccountRegister } from '@show.nw/contracts';;

export class RegisterDto {
  email: string;
  password: string;
  displayName: string;
}

export class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: AccountLogin.Request
  ): Promise<AccountLogin.Response> {
    const { id } = await this.authService.validateUser(
      loginDto.email,
      loginDto.password
    );
    return this.authService.login(id);
  }

  @Post('register')
  async register(
    @Body() registerDto: AccountRegister.Request
  ): Promise<AccountRegister.Response> {
    return this.authService.register(registerDto);
  }
}
