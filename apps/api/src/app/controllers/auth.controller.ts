import { Body, Controller, Post } from '@nestjs/common';
import { AccountLogin } from '@show.nw/contracts';
import { AccountRegister } from '@show.nw/contracts';

@Controller(`auth`)
export class AuthController {
  @Post(`login`)
  async login(@Body() loginDto: AccountLogin.Request) {}

  @Post(`register`)
  async register(@Body() registerDto: AccountRegister.Request) {}
}
