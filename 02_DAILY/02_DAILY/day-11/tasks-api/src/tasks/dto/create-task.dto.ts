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

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}