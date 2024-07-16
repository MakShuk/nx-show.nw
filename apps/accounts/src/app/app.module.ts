import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';

@Module({
  imports: [ConfigModule.forRoot(
    {
      isGlobal: true,
      envFilePath: 'envs/.accounts.env',
    }
  ), MongooseModule.forRootAsync(getMongoConfig()), UserModule],
  providers: [],
})
export class AppModule {}
