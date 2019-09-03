import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { StudentRepository } from './students.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AddStudentDto } from './dto/students.dto';
import { Student } from './student.entity';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { Auth } from '../auth/auth.entity';

@Injectable()
export class StudentsService {
  private logger = new Logger('StudentService');
  constructor(
    @InjectRepository(StudentRepository)
    private studentRepository: StudentRepository,
  ) {}

  getStudents(): Promise<Student[]> {
    return this.studentRepository.getStudents();
  }

  addStudent(addStudentDto: AddStudentDto, user: Auth): Promise<Student> {
    return this.studentRepository.addStudent(addStudentDto, user);
  }

  async getStudentById(id: number): Promise<Student> {
    const found = await this.studentRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }
    return found;
  }

  async deleteStudentById(id: number): Promise<void> {
    const result = await this.studentRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }
  }

  async updateStudentById(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const {
      dob,
      contactPhone,
      contactMobile,
      address,
      contactMail,
      category,
    } = updateStudentDto;
    const student = await this.getStudentById(id);
    student.contactPhone = contactPhone;
    student.contactMobile = contactMobile;
    student.contactMail = contactMail;
    student.address = address;
    student.category = category;
    student.dob = dob;

    try {
      await student.save();
      return student;
    } catch (error) {
      this.logger.error(`Unable to update for ${id}`, error.stack);
      throw new InternalServerErrorException(
        'Failed to update Student Details',
      );
    }
  }
}
