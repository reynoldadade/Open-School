import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { constants } from '../constants';
import { JwtStrategy } from './jwt.strategy';

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'AuthRepository',
          useClass: Repository,
        },
        JwtService,
        JwtStrategy,
      ],
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
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
