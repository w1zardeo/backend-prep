import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.findOne(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(
      createTaskDto.title,
      createTaskDto.description,
    );
  }
}
