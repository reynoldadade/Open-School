import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { StudentCategory } from './../../student-category/student-category.entity';

export class UpdateStudentDto {

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

    @ApiModelProperty()
    @IsNotEmpty()
    category: StudentCategory;

}
