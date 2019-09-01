import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddStudentCategoryDto {
    @ApiModelProperty()
    @IsNotEmpty()
    name: string;

    @ApiModelProperty()
    @IsNotEmpty()
    description: string;
}
