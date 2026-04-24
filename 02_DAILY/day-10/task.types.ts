export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}

export type CreateTaskDto = Omit<Task, 'id' | 'createdAt'>;

export type UpdateTaskDto = Partial<CreateTaskDto>;
