import { EntityRepository, Repository } from 'typeorm';
import { ChangeCredentailDto } from './dto/change-credentials.dto';
import { AuthCredentailDto } from './dto/auth-credentials.dto';
import { Auth } from './auth.entity';
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
    logger = new Logger();
    async signUp(authCredentailDto: AuthCredentailDto): Promise<void> {
        const {username, password} = authCredentailDto;

        const auth = new Auth();
        auth.username = username;

        // generate salt
        auth.salt = await bcrypt.genSalt();
        // hash password with salt
        auth.password = await this.hashPassword(password, auth.salt);

        // try and save user into db
        try {
            await  auth.save();
        } catch (error) {
            if (error.code === '23505') { // duplicate username
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async changePassword(changeCredentialsDto: ChangeCredentailDto): Promise<void> {
        const {username, oldPassword, newPassword} = changeCredentialsDto;
        const user = await this.findOne(username);
        if (user && await user.validatePassword(oldPassword)) {
            const auth = new Auth();
            auth.salt = await bcrypt.genSalt();
            auth.password = await this.hashPassword(newPassword, auth.salt);
            try {
                await auth.save();
            } catch (error) {
                this.logger.error(
                  `Unable to create new password for user "${username}", details : ${JSON.stringify(
                    changeCredentialsDto,
                  )}`,
                  error.stack,
                );
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentailDto): Promise<string> {
        const {username, password} = authCredentialsDto;
        const user = await this.findOne({username});
        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    // method to hash password
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
