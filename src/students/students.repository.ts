import { Repository, EntityRepository } from 'typeorm';
import { AddStudentDto } from './dto/students.dto';
import { Student } from './student.entity';
import {
  Logger,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Auth } from '../auth/auth.entity';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  private logger = new Logger('StudentRepository');
  async getStudents(): Promise<Student[]> {
    const query = this.createQueryBuilder('student');

    try {
      const students = await query.getMany();
      return students;
    } catch (error) {
      this.logger.error('Unable to find students', error.stack);
      throw new InternalServerErrorException(
        'Failed to retrieve from student database',
      );
    }
  }

  async addStudent(addStudentDto: AddStudentDto, user: Auth): Promise<Student> {
    const {
      firstName,
      lastName,
      otherNames,
      dob,
      contactPhone,
      contactMobile,
      address,
      contactMail,
      category,
    } = addStudentDto;

    // const category = await new studentCategoryService.getCategoryById(studentCategoryId);
    const student = new Student();

    student.firstName = firstName;
    student.lastName = lastName;
    student.otherNames = otherNames;
    student.dob = dob;
    student.contactPhone = contactPhone;
    student.contactMobile = contactMobile;
    student.contactMail = contactMail;
    student.address = address;
    student.category = category;
    student.createdBy = user.username;

    // saving new student

    try {
      await student.save();
      return student;
    } catch (error) {
      this.logger.error(
        `Failed to add  a student for Data: ${JSON.stringify(addStudentDto)}`,
        error.stack,
      );
      throw new ConflictException('Failed to create a new student');
    }
  }
}
