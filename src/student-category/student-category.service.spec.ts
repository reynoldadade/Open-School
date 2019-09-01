import { Test, TestingModule } from '@nestjs/testing';
import { StudentCategoryService } from './student-category.service';

describe('StudentCategoryService', () => {
  let service: StudentCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentCategoryService],
    }).compile();

    service = module.get<StudentCategoryService>(StudentCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
