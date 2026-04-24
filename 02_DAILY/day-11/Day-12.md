# Day 12 — Pipes + ValidationPipe (DTO validation) 🛡️

## 1. Warm-up Quiz (NestJS Basics)
- **DI (Dependency Injection):** Механізм, де NestJS сам створює та передає залежності (сервіси) у конструктори класів.
- **@Injectable():** Декоратор, що позначає клас як провайдер, який можна впроваджувати.
- **Controller:** Відповідає за HTTP роутинг та обробку вхідних запитів.
- **Service:** Місце для бізнес-логіки.
- **main.ts:** Вхідна точка додатку, де ініціалізується NestFactory.

## 2. Coding Lab: DTO Validation
**File:** `src/tasks/dto/create-task.dto.ts`
```typescript
import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}