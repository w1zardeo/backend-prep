import { Task, UpdateTaskDto } from './task.types.js';

export class TaskRepository<T extends Task> {
  private items = new Map<string, T>();

  public save(item: T): void {
    this.items.set(item.id, item);
  }

  /**
   * Оновлює існуючий запис.
   * Оскільки `data` типізовано як `UpdateTaskDto` (який є `Partial<Omit<Task, 'id' | 'createdAt'>>`),
   * TypeScript автоматично підсвітить помилкою спробу передати невідоме поле.
   */
  public update(id: string, data: UpdateTaskDto): Task {
    const item = this.items.get(id);
    
    if (!item) {
      throw new Error(`Task with id ${id} not found.`);
    }

    const updatedItem = {
      ...item,
      ...data,
    };

    this.items.set(id, updatedItem);
    return updatedItem;
  }
}

// -------------------------------------------------------------
// Validation Demo
// -------------------------------------------------------------

const repo = new TaskRepository<Task>();

// Коректне оновлення:
repo.update('task-123', { 
  title: 'Learn TypeScript Types', 
  isCompleted: true 
});

// Якщо розкоментувати код нижче, TypeScript видаватиме помилку:
// "Object literal may only specify known properties, and 'priority' does not exist in type 'UpdateTaskDto'."
/*
repo.update('task-123', { 
  title: 'Learn TypeScript Types', 
  priority: 'high' // ❌ Помилка: 'priority' не існує в UpdateTaskDto
});
*/
