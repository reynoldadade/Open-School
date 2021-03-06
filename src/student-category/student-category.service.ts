import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentCategoryRepository } from './student-category.repository';
import { AddStudentCategoryDto } from './dto/student-category.dto';
import { StudentCategory } from './student-category.entity';
import { Auth } from '../auth/auth.entity';

@Injectable()
export class StudentCategoryService {
  constructor(
    @InjectRepository(StudentCategoryRepository)
    private studentCategoryRepository: StudentCategoryRepository,
  ) {}

  addCategory(
    addStudentCategoryDto: AddStudentCategoryDto,
    user: Auth,
  ): Promise<StudentCategory> {
    return this.studentCategoryRepository.addCategory(
      addStudentCategoryDto,
      user,
    );
  }

  async getCategoryById(id: number): Promise<StudentCategory> {
    const found = await this.studentCategoryRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
    return found;
  }

  async getAllCategories(): Promise<Partial<StudentCategory[]>> {
    return this.studentCategoryRepository.getCategories();
  }

  async deleteCategoryById(id: number): Promise<void> {
    const result = await this.studentCategoryRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
  }

  async updateCategory(
    id: number,
    addStudentCategoryDto: AddStudentCategoryDto,
  ): Promise<StudentCategory> {
    const category = await this.getCategoryById(id);
    const { description, name } = addStudentCategoryDto;
    category.description = description;
    category.name = name;
    try {
      await category.save();
      return category;
    } catch (error) {
      throw new NotFoundException('Cannot update non-existent category');
    }
  }
}
