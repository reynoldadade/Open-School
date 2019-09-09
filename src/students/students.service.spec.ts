import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './student.entity';

class MockRepository {
  getStudents() {
    return [
      {
        id: 1,
        name: 'Reynold',
      },
    ];
  }
}

describe('StudentsService', () => {
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should return array for Repository', async () => {
    expect(service.getStudents()).toEqual([
      {
        id: 1,
        name: 'Reynold',
      },
    ]);
  });
});
