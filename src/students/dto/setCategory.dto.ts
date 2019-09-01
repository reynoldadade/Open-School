import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SetCategoryDto {
    @ApiModelProperty()
    @IsNotEmpty()
    id: number;

    @ApiModelPropertyOptional()
    @IsOptional()
    name: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    description: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    createdDate: Date;

    @ApiModelPropertyOptional()
    @IsOptional()
    updatedDate: Date;
}
