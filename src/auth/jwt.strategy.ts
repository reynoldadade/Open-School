import { PassportStrategy } from '@nestjs/passport';
import { AuthRepository } from './auth.repository';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { constants } from '../constants';
import { JwtPayload } from './jwt-payload.interface';
import { Auth } from './auth.entity';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: constants.jwtSecret,
        });
    }

    async validatePayload(payload: JwtPayload): Promise<Auth> {
        const {username} = payload;
        const user = await this.authRepository.findOne({username});

        if (!user) {
        throw new UnauthorizedException();
    }
        return user;
    }
}
