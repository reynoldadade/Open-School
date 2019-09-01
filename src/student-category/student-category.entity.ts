import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Student } from '../students/student.entity';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

@Entity()
export class StudentCategory extends BaseEntity {
    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelPropertyOptional()
    @Column()
    name: string;

    @ApiModelPropertyOptional()
    @Column()
    description: string;

    @OneToMany(type => Student, student => student.category, {eager : true})
    students: Student[];

    @ApiModelPropertyOptional()
    @CreateDateColumn({type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
    createdDate: string;

    @ApiModelPropertyOptional()
    @UpdateDateColumn({type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
    updatedDate: string;

}
