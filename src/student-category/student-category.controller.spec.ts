import { Test, TestingModule } from '@nestjs/testing';
import { StudentCategoryController } from './student-category.controller';
import { StudentCategoryService } from './student-category.service';
import { StudentCategory } from './student-category.entity';
import { Student } from 'src/students/student.entity';
import { GetCategoryDto } from './dto/getCategory.dto';

class StudentCategoryServiceMock {
  async getAllCategories() {
    return  [{
      id: 1,
      name: 'test',
      description: 'testing spec',
      createdDate: 'date',
      updatedDate: 'date',
      students: [],
    }];
  }
  async getCategoryById() {}
  async addCategory() {}
}

describe('StudentCategory Controller', () => {
  let controller: StudentCategoryController;
  let service: StudentCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentCategoryController],
      providers: [{
        provide: StudentCategoryService,
        useClass: StudentCategoryServiceMock,
      }],
    }).compile();

    controller = module.get<StudentCategoryController>(StudentCategoryController);
    service = module.get<StudentCategoryService>(StudentCategoryService);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});

describe('getAllCategories', () => {

  let controller: StudentCategoryController;
  let service: StudentCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentCategoryController],
      providers: [{
        provide: StudentCategoryService,
        useClass: StudentCategoryServiceMock,
      }],
    }).compile();

    controller = module.get<StudentCategoryController>(StudentCategoryController);
    service = module.get<StudentCategoryService>(StudentCategoryService);

    it('should be defined', async () => {
      expect(controller).toBeDefined();
    });

    it('should return an array of categories', async () => {
      const result: Partial<StudentCategory>[] = [{
        id: 1,
        name:  'test',
        description: 'testing',
        createdDate: 'date',
        updatedDate: 'date',
       }];
      jest.spyOn(service, 'getAllCategories').mockImplementation(async () => result);
      expect(await controller.getCategories).toBe(result);
    });
  });
});
