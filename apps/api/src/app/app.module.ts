import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.api.env', isGlobal: true }),
    RMQModule.forRootAsync(getRMQConfig()),
    JwtModule.register(getJwtConfig()),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
function getJwtConfig(): import('@nestjs/jwt').JwtModuleOptions {
  throw new Error('Function not implemented.');
}
