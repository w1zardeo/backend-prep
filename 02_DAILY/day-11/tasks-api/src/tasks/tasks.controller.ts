import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.tasksService.findAll(Number(page), Number(pageSize));
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return this.tasksService.findOne(Number(id));
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Request() req: any) {
    return this.tasksService.create(
      createTaskDto.title,
      createTaskDto.description,
      req.user.userId,
    );
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(Number(id), updateTaskDto);
  }
}
