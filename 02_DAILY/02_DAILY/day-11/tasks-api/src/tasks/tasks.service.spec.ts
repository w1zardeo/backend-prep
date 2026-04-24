import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  task: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
  },
};

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a task and call Prisma', async () => {
      const taskData = { title: 'Test Task', description: 'Test Desc', userId: 1 };
      const createdTask = { id: 1, ...taskData, status: 'OPEN', createdAt: new Date() };
      
      mockPrismaService.task.create.mockResolvedValue(createdTask);

      const result = await service.create(taskData.title, taskData.description, taskData.userId);

      expect(result).toEqual(createdTask);
      expect(prisma.task.create).toHaveBeenCalledWith({
        data: taskData,
      });
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if task is not found', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });

    it('should return a task if found', async () => {
      const task = { id: 1, title: 'Test', description: 'Desc', userId: 1 };
      mockPrismaService.task.findUnique.mockResolvedValue(task);

      const result = await service.findOne(1);
      expect(result).toEqual(task);
    });
  });
});
