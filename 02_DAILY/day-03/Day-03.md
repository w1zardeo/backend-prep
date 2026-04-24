# Day-03: Event Loop execution order (nextTick, microtasks, timers)

## 1. Warm-up Quiz (Day 2 Review)
* [cite_start]**система модулів Node.js (require):** CommonJS (CJS) [cite: 325]
* [cite_start]**Асинхронна система:** ECMAScript Modules (ESM) [cite: 326]
* [cite_start]**Налаштування ESM у package.json:** `"type": "module"` [cite: 326]
* [cite_start]**Розширення в ESM:** Так, обов’язково (наприклад, `.js`) [cite: 327]
* [cite_start]**require() ESM-модуля в CJS:** Помилка `ERR_REQUIRE_ESM` [cite: 327]
* [cite_start]**Явне розширення для CJS:** `.cjs` [cite: 328]
* [cite_start]**Імпорт CJS в ESM:** Так, через статичний або динамічний `import` [cite: 328]
* [cite_start]**Прапор для evaluate:** `-e` [cite: 329]
* [cite_start]**Чому module.exports:** Це стандарт CommonJS [cite: 329]
* [cite_start]**Інтерактивна консоль:** REPL (Read-Eval-Print Loop) [cite: 330]

---

## 2. Event Loop Puzzles (Execution Order)

### Puzzle #1: The Basics
* **Expected:** 1, 5, 4, 3, 2
* **Actual:** 1, 5, 4, 3, 2
* [cite_start]**Reasoning:** Синхронний код (1, 5) -> `nextTick` (4) -> Promises (3) -> Таймери (2). [cite: 291]

### Puzzle #2: The Nesting Trap
* **Expected:** 3, 1, 4, 2
* **Actual:** 3, 1, 4, 2
* **Reasoning:** `nextTickQueue` (3) додає Promise (4). Спочатку виконується перший Promise (1), який додає новий `nextTick` (2). [cite_start]Оскільки черга мікрозадач має бути вичерпана повністю, Promise (4) виконується перед новим `nextTick`. [cite: 333]

### Puzzle #3: I/O Cycle (readFile)
* **Expected:** 2, 1
* **Actual:** 2, 1
* [cite_start]**Reasoning:** Всередині I/O колбеку фаза `Check` (`setImmediate`) завжди йде перед наступною фазою `Timers`. [cite: 334]

### Puzzle #4: Timer Microtask Interleaving
* **Expected:** 1, 2, 3, 4
* **Actual:** 1, 2, 3, 4
* [cite_start]**Reasoning:** У Node.js мікрозадачі виконуються між окремими макрозадачами. [cite: 313]

### Puzzle #5: Deep Microtask Interleaving
* **Expected:** 1, 2, 4, 3
* **Actual:** 1, 2, 4, 3
* [cite_start]**Reasoning:** Черга промісів вичищається до кінця (2, 4), перш ніж Event Loop знову перевірить `nextTickQueue` (3). [cite: 321]

---

## 3. Validation & Evidence
* [cite_start]**Node.js version:** v23.9.0 [cite: 470]
* **Commit Link:** [Твій лінк на коміт у репозиторії]
* [cite_start]**Lab Status:** All 5 puzzles verified correctly. [cite: 339, 340]

---

## 4. Reflection
* **3 Wins:** 1. Розібрався з пріоритетами між `nextTick` та `Promise`.
    2. Зрозумів специфіку `setImmediate` всередині I/O циклу.
    3. Навчивсь аналізувати вкладені асинхронні виклики.
* [cite_start]**1 Blocker:** Розуміння того, коли саме Event Loop повертається до перевірки `nextTickQueue` під час виконання мікрозадач. [cite: 305, 321]
* [cite_start]**Залізне правило:** Спочатку синхронний код -> `nextTick` -> Microtasks (Promises) -> Timers/Immediate. [cite: 335]

---

## 5. Rubric Self-Assessment
| Component | Score | Comment |
| :--- | :--- | :--- |
| **Theory** | 2/2 | [cite_start]Чітке розуміння пріоритетів та фаз Event Loop. [cite: 338] |
| **Coding** | 2/2 | [cite_start]5 складних пазлів з детальними поясненнями. [cite: 339] |
| **Reasoning** | 2/2 | [cite_start]Правильно пояснено поведінку в I/O циклі та вкладеність мікрозадач. [cite: 340] |

**Status: COMPLETED 🏁**