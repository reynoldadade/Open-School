import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { StudentCategory } from './../student-category/student-category.entity';

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  otherNames: string;

  @Column()
  dob: Date;

  @Column()
  address: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column()
  contactMobile: string;

  @Column()
  contactMail: string;

  @ManyToOne(
    type => StudentCategory,
    studentCategory => studentCategory.students,
    { eager: false },
  )
  category: StudentCategory;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'LOCALTIMESTAMP',
  })
  createDate: string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'LOCALTIMESTAMP',
  })
  updateDate: string;

  @Column()
  categoryId: number;

  @Column({ nullable: true })
  createdBy: string;
}
