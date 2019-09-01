import { Test, TestingModule } from '@nestjs/testing';
import { StudentCategoryController } from './student-category.controller';

describe('StudentCategory Controller', () => {
  let controller: StudentCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentCategoryController],
    }).compile();

    controller = module.get<StudentCategoryController>(StudentCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
