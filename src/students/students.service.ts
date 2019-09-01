import { Injectable } from '@nestjs/common';
import { StudentRepository } from './students.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AddStudentDto } from './dto/students.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(StudentRepository)
        private studentRepository: StudentRepository) {}

    addStudent(addStudentDto: AddStudentDto): Promise<Student> {
        return this.studentRepository.addStudent(addStudentDto);
    }
}
