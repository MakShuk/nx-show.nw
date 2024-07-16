import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';


@Module({
  imports: [MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema,
    },
  ])],
  providers: [],
})
export class UserModule {}
