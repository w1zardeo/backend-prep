# Day 02 — Modules: CommonJS vs ESM

**Date:** 2026-04-15
**Topic:** Node.js Module Systems
**Status:** COMPLETED

---

## 1. Warm-up Quiz (Refined Answers)
* [cite_start]**V8 Engine:** Високопродуктивний рушій від Google (C++), який компілює JS у машинний код "на льоту" (JIT)[cite: 40, 41, 42].
* **Synchronous Blocking:** `fs.readFileSync` для великого файлу повністю блокує Event Loop. [cite_start]Сервер не зможе обробити жоден інший запит, поки файл не прочитається[cite: 45, 46, 47].
* [cite_start]**Promise States:** Pending (очікування), Fulfilled (успіх), Rejected (помилка)[cite: 49, 50, 51, 52].
* [cite_start]**Async Keyword:** Гарантує, що функція поверне `Promise`, і дозволяє використовувати `await` всередині[cite: 54, 55, 56].
* **POST Method:** Використовується для створення ресурсів. [cite_start]Він **не є** ідемпотентним (повтор запиту створює новий ресурс)[cite: 57, 58, 59].
* [cite_start]**201 Created:** Повертається при успішному створенні нового ресурсу на сервері[cite: 61, 62].
* [cite_start]**400 Bad Request:** Статус-код для випадків, коли клієнт надіслав невалідний JSON або некоректні дані[cite: 65, 66, 67].
* [cite_start]**Content-Type:** Заголовок-інструкція, що вказує серверу формат даних (наприклад, `application/json`) для їх правильного парсингу[cite: 68, 69, 70].
* [cite_start]**Unhandled Rejection:** У сучасних версіях Node.js (v15+) процес негайно завершує роботу (crash) із кодом 1[cite: 73, 75, 313].
* [cite_start]**Data Event:** Подія, через яку Node.js збирає фрагменти (chunks) тіла запиту у вигляді потоку (Streams)[cite: 78, 80].

---

## 2. Focused Theory: Key Takeaways
* **CommonJS (CJS):** Синхронне завантаження, `require()`, `module.exports`. [cite_start]Стандарт за замовчуванням[cite: 87, 88, 92].
* **ECMAScript Modules (ESM):** Асинхронне завантаження, `import/export`. [cite_start]Вимагає `"type": "module"` у `package.json` або розширення `.mjs`[cite: 89, 90, 95].
* [cite_start]**Mandatory Extensions:** В ESM обов'язково вказувати розширення файлу (наприклад, `./math.js`), інакше виникне помилка[cite: 99].
* [cite_start]**Interoperability:** ESM може імпортувати CJS модулі, але CJS не може робити `require()` для ESM модулів[cite: 101, 102].

---

## 3. Coding Lab Evidence

### Versions
* **Node.js:** v23.9.0
* **NPM:** 11.7.0

### Project Structure & Logs
* **CJS Demo (`/day-02/cjs-demo/index.js`):**
    * `2 * 3 = 6` (Виконано через `require`)
* **ESM Demo (`/day-02/esm-demo/index.js`):**
    * `hello -> Hello` (Виконано через `import` з розширенням `.js`)
* **Mixed Demo (`/day-02/mixed-demo/app.js`):**
    * `Server is running on port: 8080` (Імпорт `.cjs` файлу в ESM середовище)

### Commit Link
* [GitHub: backend-prep - Day 02 Modules](https://github.com/w1zardeo/backend-prep)

---

## 4. Reflection
* [cite_start]**3 Wins:** 1. Розібрався з помилкою `Missing script` шляхом налаштування секції `scripts` у `package.json`[cite: 139, 140].
    2. [cite_start]Успішно реалізував змішаний імпорт (CJS в ESM)[cite: 197].
    3. [cite_start]Навчився запускати файли як через прямі шляхи, так і через короткі команди `node .`[cite: 130].
* [cite_start]**1 Blocker:** Розуміння того, чому Node.js ігнорує розширення файлів у CJS, але вимагає їх в ESM[cite: 98, 99].
* **Next Plan:** Вивчення черговості виконання Event Loop (nextTick, microtasks, timers).

---

## 5. Rubric Assessment
| Component | Score | Comment |
| :--- | :---: | :--- |
| **Theory** | 2/2 | Чітке розуміння різниці між системами модулів. |
| **Coding** | 2/2 | Всі три демо працюють коректно, валідація пройдена. |
| **Reasoning** | 2/2 | Успішно подолано проблеми з путями та скриптами запуску. |

**Final Score: 6/6 (EXCELLENT)**