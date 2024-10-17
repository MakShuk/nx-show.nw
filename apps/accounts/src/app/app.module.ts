import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';
import { AuthModule } from './auth/auth.module';
import { UserCommands } from './user/user.commands';
import { UserQueries } from './user/user.queries';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.accounts.env',
    }),
    RMQModule.forRootAsync(getRMQConfig()),
    MongooseModule.forRootAsync(getMongoConfig()),
    UserModule,
    AuthModule,
  ],
  providers: [UserCommands, UserQueries],
})
export class AppModule {}
