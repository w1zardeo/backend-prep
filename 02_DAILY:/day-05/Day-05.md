# Day 05: HTTP in Node: minimal server, headers, status codes

## 🧠 Warm-up Quiz Results
- Score: 10/10 (Verified against reference answers)

## 🏗️ Coding: Tasks Server
- Repository: [backend-prep](https://github.com/w1zardeo/backend-prep)
- Features: 
  - POST /items (201 Created + Location header)
  - GET /items/:id (200 OK or 404 Not Found)
  - Centralized in-memory Map storage.

## 📝 Reflection: 3 Rules of REST for Junior
1. **Semantics over Habit:** Використовувати 201 для створення, а не просто 200.
2. **Statelessness:** Сервер не повинен залежати від стану клієнта між запитами.
3. **Resource-based:** Ендпоїнти мають іменуватися за ресурсами (`/items`), а не за діями (`/create-item`).