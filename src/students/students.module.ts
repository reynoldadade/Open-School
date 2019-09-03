import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository } from './students.repository';
import { StudentCategoryModule } from '../student-category/student-category.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentRepository]),
    AuthModule,
    StudentCategoryModule,
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}
