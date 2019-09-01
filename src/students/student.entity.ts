import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Student extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lastName: string;

    @Column()
    firstName: string;

    @Column({nullable: true})
    otherNames: string;

    @Column()
    dob: Date;

    @Column()
    address: string;

    @Column({nullable: true})
    contactPhone: string;

    @Column()
    contactMobile: string;

    @Column()
    contactMail: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'create_date',
        default: () => 'LOCALTIMESTAMP' })
    createDate: string;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'update_date',
        default: () => 'LOCALTIMESTAMP' })
    updateDate: string;
}
