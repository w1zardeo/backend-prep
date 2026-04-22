# Day 15 — Prisma + PostgreSQL Integration

## 🧠 Warm-up Quiz Results
1. **In-memory scaling:** Дані не синхронізуються між інстансами; при перезапуску — втрата даних. (Score: 2)
2. **Race Condition:** Стан, коли результат залежить від черговості виконання запитів (одночасне оновлення). (Score: 2)
3. **PATCH vs PUT:** PATCH — часткове оновлення, PUT — повна заміна ресурсу. (Score: 2)
4. **409 Conflict:** Правильний статус для дублікатів (наприклад, email). (Score: 2)
5. **ORM 2026:** Type-safety, автогенерація клієнта, легкі міграції. (Score: 2)
6. **Idempotency:** Властивість методу повертати той самий результат при повторних однакових запитах (GET, PUT, DELETE). (Score: 2)
7. **.env security:** Запобігає потраплянню hardcoded credentials у git. (Score: 2)
8. **DI Mechanism:** NestJS використовує Metadata Reflection через декоратори. (Score: 2)

## 💻 Coding Activity: Prisma Setup
- **Model Task:**
```prisma
model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  status      Status   @default(OPEN)
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
}

enum Status {
  OPEN
  IN_PROGRESS
  DONE
}