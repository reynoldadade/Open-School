import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class AddStudentDto {

    @ApiModelProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiModelProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiModelPropertyOptional()
    otherNames: string;

    @ApiModelProperty({type: 'string', format: 'date-time'})
    @IsNotEmpty()
    dob: Date;

    @ApiModelProperty()
    @IsNotEmpty()
    address: string;

    @ApiModelPropertyOptional()
    contactPhone: string;

    @ApiModelProperty()
    @IsNotEmpty()
    contactMobile: string;

    @ApiModelProperty()
    @IsNotEmpty()
    contactMail: string;

}
