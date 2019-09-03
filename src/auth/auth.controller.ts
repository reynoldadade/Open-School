import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentailDto } from './dto/auth-credentials.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ChangeCredentailDto } from './dto/change-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  signUp(
    @Body(ValidationPipe) authCredentailDto: AuthCredentailDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentailDto);
  }

  @Post('/signIn')
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentailDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  @Patch('/changePassword')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  changePassword(
    @Body(ValidationPipe) changeCredentialsDto: ChangeCredentailDto,
  ): Promise<void> {
    return this.authService.changePassword(changeCredentialsDto);
  }
}
