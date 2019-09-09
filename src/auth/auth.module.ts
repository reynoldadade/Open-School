import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { PassportModule } from '@nestjs/passport';
import { constants } from '../constants';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: constants.defaultStrategy,
    }),
    JwtModule.register({
      secret: constants.jwtSecret,
      signOptions: {
        expiresIn: constants.tokenExpiresIn,
      },
    }),
    TypeOrmModule.forFeature([AuthRepository]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, JwtService],
})
export class AuthModule {}
