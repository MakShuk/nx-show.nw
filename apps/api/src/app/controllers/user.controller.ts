import { Controller, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../guard/jwt.guard';
import { UserId } from '../guard/user.decorator';

@Controller('user')
export class UserController {
  @UseGuards(JWTAuthGuard)
  @Post(`info`)
  async info(@UserId() user: string) {
    return user;
  }
}
