# Day 11: Вступ до NestJS — Перший професійний каркас

## 1. Warm-up Quiz Results (Закріплення TypeScript)
1. **Generic**: Тип-шаблон, що дозволяє створювати компоненти, які працюють з різними типами даних без втрати типізації.
2. **Omit vs Pick**: `Pick<T, 'k'>` вибирає конкретні поля, `Omit<T, 'k'>` видаляє їх.
3. **UpdateTaskDto**: Потрібен для PATCH-запитів, де всі поля мають бути необов'язковими (`Partial`), на відміну від POST (`CreateTaskDto`).
4. **Constraint**: Ключове слово `extends` (наприклад, `T extends Task`).
5. **DTO як контракт**: Описує точну форму даних для обміну між клієнтом та API.
6. **Awaited<T>**: Розпаковує тип всередині Promise.
7. **Небезпека Partial**: Може призвести до помилок `undefined` у рантаймі, якщо логіка очікує наявність поля.
8. **Runtime**: Utility types існують ТІЛЬКИ на етапі розробки (IDE/tsc) і зникають після компіляції в JS.

## 2. Coding Lab: Tasks API Startup
- **Команди Nest CLI**: 
  - `nest new tasks-api`
  - `nest g mo tasks`
  - `nest g co tasks --no-spec`
  - `nest g s tasks --no-spec`
- **Архітектурний ланцюжок**: запит потрапляє в `TasksController` -> викликає метод у `TasksService` -> повертає дані.

## 3. Terminal & Verification Logs
- **Server Start**: `LOG [NestApplication] Nest application successfully started`
- **Verification**: `curl http://localhost:3000/tasks` повернув `[]`.

## 4. Рефлексія та Git Fixes
- **Проблема**: Випадковий коміт `node_modules` (84+ об'єкти).
- **Рішення**: Налаштовано `.gitignore`, очищено кеш Git (`git rm --cached`).
- **Враження**: NestJS здається "космічним кораблем" порівняно з чистим `node:http`. Декоратори ховають складність, а DI (Dependency Injection) бере на себе керування екземплярами класів, що значно спрощує масштабування.