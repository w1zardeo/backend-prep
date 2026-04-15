# Day 04: Async Error Handling (process, unhandledRejection)

## 🧠 Warm-up Quiz Results (Event Loop Review)
1. [cite_start]**nextTick vs setImmediate:** `nextTick` виконується одразу після поточної операції (перед мікрозадачами), а `setImmediate` — у фазі Check. [cite: 186, 190]
2. [cite_start]**Priority:** `process.nextTick()` виконається першим. [cite: 191]
3. **Blocking:** Ні, `setTimeout` — це асинхронна макрозадача; [cite_start]синхронний код іде далі. [cite: 47, 191]
4. [cite_start]**Recursion:** Процес заблокує Event Loop (Event Loop Starvation), і таймери ніколи не спрацюють. [cite: 236, 489]
5. [cite_start]**Phase:** У фазі Check (одразу після Poll). [cite: 210, 234]
6. [cite_start]**Microtasks:** Так, черга мікрозадач вичищається повністю перед переходом до наступної фази. [cite: 221, 233]
7. [cite_start]**Poll Phase:** Фаза, де Node.js чекає на нові події I/O та виконує їх колбеки. [cite: 209]
8. [cite_start]**Timeout 0:** Існує мінімальний поріг (зазвичай 1ms) та затримка самої ініціалізації циклу. [cite: 189, 211]

## 🏗️ Coding: Async Pipeline
- **File:** `day-04/pipeline.js`
- [cite_start]**Key Feature:** Централізований `handleError` та обробка `unhandledRejection`. [cite: 242]
- **Scenarios:** - [x] Success flow
    - [x] [cite_start]Sync error (JSON.parse) via Promise wrapper [cite: 25]
    - [x] [cite_start]Async reject handle via try/catch [cite: 509]

## 📝 Reflection
**Головне правило:** Ніколи не залишай проміс без `.catch()` або `try/catch`. [cite_start]Кожна асинхронна операція має бути "заземлена" в централізований обробник помилок, щоб уникнути непередбачуваних падінь процесу. [cite: 30, 242]