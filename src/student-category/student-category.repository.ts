import { EntityRepository, Repository } from 'typeorm';
import { StudentCategory } from './student-category.entity';
import { AddStudentCategoryDto } from './dto/student-category.dto';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { Auth } from '../auth/auth.entity';

@EntityRepository(StudentCategory)
export class StudentCategoryRepository extends Repository<StudentCategory> {
  private logger = new Logger('StudentCategoryRepository');

  async addCategory(
    addStudentCategoryDto: AddStudentCategoryDto,
    user: Auth,
  ): Promise<StudentCategory> {
    const { name, description } = addStudentCategoryDto;

    const category = new StudentCategory();
    category.name = name;
    category.description = description;
    category.createdBy = user.username;
    await category.save();

    try {
      return category;
    } catch (error) {
      this.logger.error(
        `Failed to create a task for ${JSON.stringify(category)}`,
      );
    }
  }

  async getCategories(): Promise<StudentCategory[]> {
    const query = this.createQueryBuilder('StudentCategory');

    try {
      const categories = await query.getMany();
      return categories;
    } catch (error) {
      this.logger.error(`Failed to get categories. Filters: None`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
