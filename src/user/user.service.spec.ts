import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Role } from '../enums/role.enum';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn().mockResolvedValue(UserEntity),
            find: jest.fn().mockResolvedValue(UserEntity),
            findAll: jest.fn().mockResolvedValue(UserEntity),
            findOne: jest.fn().mockResolvedValue(UserEntity),
            update: jest.fn().mockResolvedValue(UserEntity),
            exists: jest.fn().mockResolvedValue(UserEntity),
            remove: jest.fn().mockResolvedValue(UserEntity),
            delete: jest.fn().mockResolvedValue(UserEntity),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('Validando definição da classe.', () => {
    expect(service).toBeDefined();
  });

  test('create', async () => {
    const result = await service.create({
      name: 'Denis',
      email: 'denis@gmail.com',
      password: '',
      role: Role.User,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    expect(result).toEqual(UserEntity);
  });

  test('findAll', async () => {
    const result = await service.findAll();
    expect(result).toEqual(UserEntity);
  });

  test('findOne', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(UserEntity);
  });

  test('update', async () => {
    const result = await service.update(1, {
      name: 'Denis',
      email: 'denis@gmail.com',
      password: '',
      role: Role.User,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    expect(result).toEqual(UserEntity);
  });

  test('remove', async () => {
    const result = await service.remove(1);
    expect(result).toEqual(UserEntity);
  });
});
