import { Repository, EntityRepository } from 'typeorm';
import { AddStudentDto } from './dto/students.dto';
import { Student } from './student.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
    private logger = new Logger('StudentRepository');

    async getStudent(): Promise<Student[]> {
        const query = this.createQueryBuilder('student');

        try {
            const students = await query.getMany();
            return students;
        } catch (error) {
            console.log(error);
        }
    }

    async addStudent(addStudentDto: AddStudentDto): Promise<Student> {
        const {
            firstName,
            lastName,
            otherNames,
            dob,
            contactPhone,
            contactMobile,
            address,
            contactMail,
        } = addStudentDto;

        const student = new Student();

        student.firstName = firstName;
        student.lastName = lastName;
        student.otherNames = otherNames;
        student.dob = dob;
        student.contactPhone = contactPhone;
        student.contactMobile = contactMobile;
        student.contactMail = contactMail;
        student.address = address;

        // saving new student

        try {
            await student.save();
            return student;
        } catch (error) {
            this.logger.error(`Failed to add  a student for Data: ${JSON.stringify(addStudentDto)}`);
        }
    }

}
