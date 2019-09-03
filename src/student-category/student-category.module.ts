import { Module } from '@nestjs/common';
import { StudentCategoryService } from './student-category.service';
import { StudentCategoryController } from './student-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentCategoryRepository } from './student-category.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudentCategoryRepository]), AuthModule],
  providers: [StudentCategoryService],
  controllers: [StudentCategoryController],
  exports: [StudentCategoryService],
})
export class StudentCategoryModule {}
