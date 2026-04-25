import {
  IsString,
  MinLength,
  IsOptional,
  IsNotEmpty,
  IsInt,
  IsEnum,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { TaskStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy groceries', description: 'The title of the task' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiPropertyOptional({ example: 'Milk, bread, cheese', description: 'The description of the task' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1, description: 'The ID of the user who owns the task' })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiPropertyOptional({ enum: TaskStatus, example: TaskStatus.OPEN })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}