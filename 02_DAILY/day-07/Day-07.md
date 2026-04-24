# Day-07: Checkpoint #1 — Review & CRUD Implementation

## 🧠 Interview Prep Highlights
- [cite_start]**In-memory Storage**: Використано `Map` для $O(1)$ доступу до даних та збереження порядку вставки[cite: 1713].
- [cite_start]**JSON Streaming**: Реалізовано `Transform` стрім для серіалізації великих масивів даних без блокування Event Loop[cite: 1723].
- [cite_start]**Error Boundaries**: Асинхронний парсинг тіла запиту ізольовано у `Promise`, що гарантує вилов невалідного JSON (400 Bad Request)[cite: 1718].

## 🏗️ Code Evidence (server.js)
- **Endpoints**:
    - [cite_start]`POST /users`: 201 Created + Location header[cite: 1725].
    - [cite_start]`GET /users`: Streamed array response[cite: 1719].
    - [cite_start]`GET /users/:id`: 200 OK або 404[cite: 1727].
    - [cite_start]`DELETE /users/:id`: 204 No Content[cite: 1726].

## 📝 Reflection
- [cite_start]**Strong Parts**: Робота зі стрімами та централізована обробка помилок[cite: 1710].
- [cite_start]**Weak Parts**: Валідація форматів даних (email) та заголовки безпеки (CORS/nosniff)[cite: 1732, 1733].