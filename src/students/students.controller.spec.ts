import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { PassportModule } from '@nestjs/passport';
import { constants } from '../constants';
import { JwtModule } from '@nestjs/jwt';

class MockStudentService {
  getStudents() {
    return [
      {
        id: 1,
        name: 'Reynold',
      },
    ];
  }
}

describe('Students Controller', () => {
  let controller: StudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({
          defaultStrategy: constants.defaultStrategy,
        }),
        JwtModule.register({
          secret: constants.jwtSecret,
          signOptions: {
            expiresIn: constants.tokenExpiresIn,
          },
        }),
      ],
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useClass: MockStudentService,
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should called student service', () => {
    expect(controller.getStudents()).toEqual([
      {
        id: 1,
        name: 'Reynold',
      },
    ]);
  });
});
