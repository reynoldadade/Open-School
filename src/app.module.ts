import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { StudentCategoryModule } from './student-category/student-category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    StudentsModule,
    StudentCategoryModule,
  ],
})
export class AppModule {}
