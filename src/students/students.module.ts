import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository } from './students.repository';
import { StudentCategoryModule } from '../student-category/student-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentRepository]),
    StudentCategoryModule,
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}
