import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({ enum: TaskStatus, example: TaskStatus.COMPLETED })
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
