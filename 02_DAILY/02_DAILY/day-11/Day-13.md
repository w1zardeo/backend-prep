# Day 13: Exception Filters & Consistent Error Model 🛡️

## 🧠 Warm-up Quiz Results (Pipes & Validation)

1. [cite_start]**Pipe**: Це клас, що виконує трансформацію (зміна типу) та валідацію (перевірка схем)[cite: 2299].
2. **Mass Assignment**: Атака, де клієнт надсилає зайві поля (наприклад, `isAdmin`). [cite_start]`whitelist: true` автоматично видаляє такі поля[cite: 2323, 2382].
3. [cite_start]**forbidNonWhitelisted**: Викине помилку 400, якщо в запиті є бодай одне поле, не описане в DTO[cite: 2395].
4. [cite_start]**transform: true**: Автоматично перетворює вхідний JSON (Plain Object) на екземпляр класу DTO та приводить типи (наприклад, `string` до `number`)[cite: 2397, 2398].
5. [cite_start]**Default Status**: 400 Bad Request[cite: 2303].
6. [cite_start]**Validation Requirement**: Декоратори самі по собі не працюють без підключеного `ValidationPipe` у `main.ts`[cite: 2300, 2736].
7. [cite_start]**Transformation vs Validation**: Трансформація змінює дані, валідація — перевіряє їх на відповідність правилам[cite: 2299].
8. [cite_start]**Library**: `class-validator`[cite: 2301].

## 🏗️ Coding Lab: Global Exception Filter

### File: `src/core/filters/http-exception.filter.ts`
Реалізовано уніфікований формат відповіді для всіх HTTP-помилок:
```json
{
  "code": "STATUS_CODE_NAME",
  "message": "Human readable message",
  "details": "Original error context",
  "timestamp": "ISO Date",
  "path": "/request-url"
}