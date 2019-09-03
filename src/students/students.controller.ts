import {
  Controller,
  Logger,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AddStudentDto } from './dto/students.dto';
import { Student } from './student.entity';
import { StudentsService } from './students.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from '../auth/auth.entity';
import { GetUser } from '../auth/get-user.decorator';

@ApiUseTags('students')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('students')
export class StudentsController {
  private logger = new Logger('StudentsController');
  constructor(private studentsService: StudentsService) {}

  @Get()
  getStudents(): Promise<Student[]> {
    this.logger.verbose('Getting all students');
    return this.studentsService.getStudents();
  }

  @Post()
  @UsePipes(ValidationPipe)
  addStudent(
    @Body() addStudentDto: AddStudentDto,
    @GetUser() user: Auth,
  ): Promise<Student> {
    return this.studentsService.addStudent(addStudentDto, user);
  }

  @Get(':id')
  getStudentById(@Param('id', ParseIntPipe) id: number): Promise<Student> {
    return this.studentsService.getStudentById(id);
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    return this.updateStudent(id, updateStudentDto);
  }

  @Delete(':id')
  deleteStudentById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.studentsService.deleteStudentById(id);
  }
}
