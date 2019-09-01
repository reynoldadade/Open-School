import { Controller, Logger, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddStudentDto } from './dto/students.dto';
import { Student } from './student.entity';
import { StudentsService } from './students.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('students')
@Controller('students')
export class StudentsController {
    private logger = new Logger('StudentsController');
    constructor(private studentsService: StudentsService){}

    @Post()
    @UsePipes(ValidationPipe)
    addStudent(
        @Body() addStudentDto: AddStudentDto,
    ): Promise<Student> {
        return this.studentsService.addStudent(addStudentDto);
    }
}
