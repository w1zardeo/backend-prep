import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
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
}
