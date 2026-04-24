import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const [items, totalItems] = await Promise.all([
      this.prisma.task.findMany({
        skip,
        take: pageSize,
      }),
      this.prisma.task.count(),
    ]);

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      items,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize,
      },
    };
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async create(title: string, description: string, userId: number): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title,
        description,
        userId,
      },
    });
  }

  async update(id: number, updateTaskDto: any): Promise<Task> {
    await this.findOne(id);
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }
}
