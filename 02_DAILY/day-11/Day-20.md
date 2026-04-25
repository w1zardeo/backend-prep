# 02_DAILY/Day-20.md

# Day-20 — OpenAPI (Swagger) docs for your API

## 1. Warm-up Quiz Results
1. **Unit vs E2E:** Unit тестує окремий клас/функцію в ізоляції (з mock-ами), E2E — весь потік через HTTP.
2. **TestingModule:** Створює ізольований контекст NestJS для тестування без запуску всього додатка.
3. **Jest Mock Call:** Використовувати `expect(fn).toHaveBeenCalledWith(args)`.
4. **AAA:** Arrange (підготовка), Act (дія), Assert (перевірка результату).
5. **Mock Prisma:** Через `DeepMockProxy` або створення об'єкта-заглушки для PrismaService.
6. **E2E Speed:** Бо вони піднімають сервер, БД (часто) і роблять реальні мережеві запити.
7. **@Injectable():** Дозволяє NestJS керувати залежностями класу, що спрощує підміну (mocking) у тестах.
8. **Specific file:** `npm test -- path/to/file.spec.ts`.

## 2. Coding: Swagger Implementation
- **Dependencies:** `@nestjs/swagger` встановлено.
- **main.ts:** Додано `SwaggerModule.createDocument` з префіксом `/api`.
- **DTOs:** Додано `@ApiProperty()` до `CreateTaskDto` та `UpdateTaskDto` (включаючи `description` та `example`).
- **Controllers:** Використано `@ApiTags('tasks')`, `@ApiOperation()` та `@ApiResponse({ status: 201 })`.
- **Security:** Налаштовано `@ApiBearerAuth()` для захищених маршрутів.

## 3. Validation Evidence
- **Swagger UI:** Доступний за адресою `http://localhost:3000/api`. Бачу схеми DTO та 5 ендпоїнтів (CRUD + Auth).
- **Log:** `[Nest] NestApplication - Nest application successfully started`.
- **Commit:** `[Day-20: Swagger integration and DTO documentation]`

## 4. Reflection
- **3 найважливіші поля:** 1. **Example Value:** Щоб фронтенд відразу бачив структуру JSON.
  2. **HTTP Status Codes:** Чітке розуміння, що очікувати при помилці (400 vs 404).
  3. **Description:** Коротке пояснення бізнес-логіки ендпоїнта.

## 5. Rubric Self-Assessment
- **Theory:** 2/2 (Розумію роль OpenAPI)
- **Coding:** 2/2 (Swagger повністю інтегрований)
- **Reasoning:** 2/2 (Обґрунтував вибір полів для документації)