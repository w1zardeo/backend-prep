import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor() {
    // Наповнюємо 25 тестовими задачами
    for (let i = 1; i <= 25; i++) {
      this.tasks.push({
        id: i.toString(),
        title: `Task ${i}`,
        description: `Description for task ${i}`,
      });
    }
  }

  findAll(page: number = 1, pageSize: number = 10) {
    const totalItems = this.tasks.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const items = this.tasks.slice(startIndex, startIndex + pageSize);

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

  findOne(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  create(title: string, description?: string): Task {
    const task: Task = {
      id: Math.random().toString(36).substring(7),
      title,
      description: description || '',
    };
    this.tasks.push(task);
    return task;
  }

  update(id: string, updateTaskDto: Partial<Task>): Task {
    const task = this.findOne(id);

    if (updateTaskDto.title) {
      task.title = updateTaskDto.title;
    }
    if (updateTaskDto.description) {
      task.description = updateTaskDto.description;
    }

    return task;
  }
}
