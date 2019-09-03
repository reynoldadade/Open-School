import { IsString, MinLength, MaxLength, IsNotEmpty, Matches, NotEquals } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ChangeCredentailDto {
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
    oldPassword: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @IsNotEmpty()
    @ApiModelProperty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message : 'password is too weak'})
    newPassword: string;
}
