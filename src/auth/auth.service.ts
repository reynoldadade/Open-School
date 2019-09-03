import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentailDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { ChangeCredentailDto } from './dto/change-credentials.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentailDto): Promise<void> {
    return this.authRepository.signUp(authCredentialDto);
  }

  async signIn(
    authCredentialDto: AuthCredentailDto,
  ): Promise<{ accessToken: string }> {
    // check details given
    const username = await this.authRepository.validateUserPassword(
      authCredentialDto,
    );

    // check if username was returned
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return { accessToken };
  }

  async changePassword(changePasswordDto: ChangeCredentailDto): Promise<void> {
    return this.authRepository.changePassword(changePasswordDto);
  }
}
