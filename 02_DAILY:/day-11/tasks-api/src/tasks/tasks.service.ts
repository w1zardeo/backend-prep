import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
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
