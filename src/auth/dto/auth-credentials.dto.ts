import { IsString, MinLength, MaxLength, IsNotEmpty, Matches } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthCredentailDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    @ApiModelProperty()
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @IsNotEmpty()
    @ApiModelProperty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message : 'password is too weak'})
    password: string;
}
