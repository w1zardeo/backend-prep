# Day 06 — Streams & Backpressure

## 1. Warm-up Quiz (HTTP Semantics)
* [cite_start]**200 vs 201**: 200 — успіх (GET), 201 — успішно створено ресурс (POST)[cite: 1285, 1408, 1409].
* [cite_start]**Header для 201**: Заголовок `Location` із URL нового ресурсу[cite: 1286, 1407, 1419].
* **Safe GET vs Unsafe POST**: GET не змінює стан сервера; [cite_start]POST — створює/змінює ресурси[cite: 1287, 1411].
* [cite_start]**Conflict (409)**: Код, що повертається при спробі створити існуючий унікальний ресурс[cite: 1288, 1413].
* [cite_start]**Ідемпотентність**: Здатність отримувати той самий результат при повторних запитах (POST — не ідемпотентний)[cite: 1289, 1411].
* [cite_start]**startsWith('/items/')**: Використовувався для маршрутизації (routing) та виділення ID ресурсу[cite: 1290, 1431].
* **4xx vs 5xx**: 4xx — помилка клієнта; [cite_start]5xx — помилка сервера[cite: 1291, 1414].
* [cite_start]**Map vs Object**: Map краще підходить для динамічних даних, зберігає порядок і має кращу продуктивність[cite: 1291, 1417].

## 2. Coding: transform.js
*Використано `pipeline` для безпечного з'єднання потоків та `Transform` стрім для маніпуляції даними.*

```javascript
// Код успішно реалізовано з використанням pipeline та Transform stream [cite: 1362, 1370]