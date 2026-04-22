# Day-17 — Pagination contract (practical REST)

## 🎯 Goals
- Реалізувати пагінацію (limit/offset) у NestJS за допомогою Prisma.
- Сформувати стандартний мета-контракт відповіді (items + meta).
- Обробити крайні випадки (пусті сторінки, некоректні параметри).

## 🧩 Warm-up Quiz (Answers)
1. **206 Partial Content:** Використовується, коли сервер повертає лише частину ресурсу. У пагінації це логічно, бо ми віддаємо частину масиву, проте стандарт REST частіше використовує 200 OK з мета-даними в тілі.
2. **Prisma skip/take:** Ключове слово `take` відповідає за ліміт (кількість записів), а `skip` — за офсет (скільки пропустити).
3. **Invalid inputs:** Якщо `page < 1`, ми маємо скинути його до 1 або кинути 400 Bad Request. Якщо `pageSize` занадто великий (наприклад, 1 млн), сервер має обмежити його (наприклад, до 100), щоб уникнути DoS-атаки на пам'ять.
4. **Ordering importance:** Без чіткого `orderBy` база даних не гарантує порядок записів. При переході між сторінками записи можуть "перестрибувати" зі сторінки на сторінку, якщо порядок зміниться.

## 💻 Coding Task: Tasks Pagination

### Implementation Details:
- Створено `PaginationQueryDto` з використанням `class-validator`.
- В `main.ts` активовано `transform: true` для автоматичної конвертації рядків з Query у числа.
- Використано `$transaction` для отримання даних та загальної кількості записів.

### TasksService Snippet:
```typescript
async findAll(query: PaginationQueryDto) {
  const { page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;

  const [items, total] = await this.prisma.$transaction([
    this.prisma.task.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    this.prisma.task.count(),
  ]);

  return {
    items,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}