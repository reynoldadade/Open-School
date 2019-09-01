import { Controller, Logger, Get, Post, Body, UsePipes, ValidationPipe, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { AddStudentDto } from './dto/students.dto';
import { Student } from './student.entity';
import { StudentsService } from './students.service';
import { ApiUseTags } from '@nestjs/swagger';
import { UpdateStudentDto } from './dto/updateStudent.dto';

@ApiUseTags('students')
@Controller('students')
export class StudentsController {
    private logger = new Logger('StudentsController');
    constructor(private studentsService: StudentsService) {}

    @Get()
    getStudents(): Promise<Student[]> {
        return this.studentsService.getStudents();
    }

    @Post()
    @UsePipes(ValidationPipe)
    addStudent(
        @Body() addStudentDto: AddStudentDto,
    ): Promise<Student> {
        return this.studentsService.addStudent(addStudentDto);
    }

    @Get(':id')
    getStudentById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Student> {
        return this.studentsService.getStudentById(id);
    }

    @UsePipes(ValidationPipe)
    @Patch(':id')
    updateStudent(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateStudentDto: UpdateStudentDto,
        ): Promise <Student>{
            return this.updateStudent(id, updateStudentDto);
        }

    @Delete(':id')
    deleteStudentById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
        return this.studentsService.deleteStudentById(id);
    }
}
