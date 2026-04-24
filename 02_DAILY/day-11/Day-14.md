# Day-14: Checkpoint #2 (NestJS Fundamentals)

## 🎯 Статус за день
* **Тема:** NestJS Patch, Testing & Checkpoint #2
* **Час роботи:** 2.5h
* **Confidence:** 8/10
* **Repo:** https://github.com/w1zardeo/backend-prep

---

## 📝 Checkpoint Transcript

### Part 1: Theory (Interviewer Mode)
* **Q1: Dependency Injection у NestJS?**
    * *Відповідь:* Nest IoC container відповідає за створення інстансів. TasksService потрапляє в TasksController через constructor injection.
    * *Оцінка:* 2/2

### Part 2: Coding Task (NestJS Patch & E2E)
* **UpdateTaskDto:** Реалізовано з використанням `PartialType` від `@nestjs/mapped-types` для забезпечення опціональності полів при PATCH запиті.
* **Validation:** Додано `@IsOptional()` разом із базовими правилами валідації.
* **Logic:** Додано перевірку на існування ресурсу та викидання `NotFoundException` (404).
* **E2E Test:** Написано тест за допомогою `supertest`, який перевіряє успішний апдейт (200 OK) та коректність змінених даних.

---

## 🛠 Докази виконання

### 1. UpdateTaskDto & Controller
```typescript
// update-task.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

// tasks.controller.ts
@Patch(':id')
update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  return this.tasksService.update(id, updateTaskDto);
}