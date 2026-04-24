// Централізований обробник непокритих асинхронних помилок
process.on('unhandledRejection', (reason, promise) => {
    console.error('\n🚨 [CRITICAL] Unhandled Promise Rejection!');
    console.error('   Reason:', reason instanceof Error ? reason.message : reason);
});

// Централізований обробник помилок (Centralized Error Handler)
function handleError(error) {
    console.error(`\n❌ [Centralized Error Handler] Caught an error:`);
    console.error(`   Message: ${error.message}`);
}

// 1. Асинхронна функція завантаження (імітація I/O через setTimeout)
function loadUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 'INVALID_ID') {
                return reject(new Error('User not found (Async Reject)'));
            }
            
            console.log(`[1] User ${userId} loaded`);
            // Мокаємо відповідь від бази. Якщо ID == CORRUPT_JSON, повертаємо невалідний JSON
            const mockJson = userId === 'CORRUPT_JSON' 
                ? '{ "id": 1, name: "John" }' // Помилка синтаксису (немає лапок у ключа "name")
                : '{ "id": 1, "name": "John" }'; // Валідний JSON
                
            resolve(mockJson);
        }, 100);
    });
}

// 2. Асинхронна функція парсингу (містить потенційно СИНХРОННУ помилку)
function parseData(jsonString) {
    // Завдяки Promise.resolve().then() синхронна помилка JSON.parse
    // не звалить додаток, а буде акуратно перехоплена як Rejected Promise
    return Promise.resolve(jsonString).then((str) => {
        console.log('[2] Parsing user data...');
        // Якщо JSON невалідний, тут вилетить синхронна помилка (SyntaxError)
        return JSON.parse(str); 
    });
}

// 3. Асинхронна функція трансформації даних
function transformData(userObj) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('[3] Transforming data...');
            userObj.isTransformed = true;
            userObj.name = userObj.name.toUpperCase();
            resolve(userObj);
        }, 100);
    });
}

// Асинхронний конвеєр (Pipeline)
async function runPipeline(scenario, userId) {
    console.log(`\n--- Running Scenario: ${scenario} ---`);
    try {
        const json = await loadUser(userId);
        const data = await parseData(json);
        const finalData = await transformData(data);
        
        console.log('✅ Pipeline finished successfully!\n   Result:', finalData);
    } catch (error) {
        // Будь-яка помилка (хоч синхронна при парсингу, хоч асинхронний reject) піймається тут
        handleError(error);
    }
}

// Запуск сценаріїв
async function bootstrap() {
    // Сценарій 1: Успішне виконання
    await runPipeline('1. Success', 'USER_123');

    // Сценарій 2: Помилка парсингу JSON 
    // (синхронна помилка всередині асинхронного ланцюжка)
    await runPipeline('2. Sync JSON parsing error', 'CORRUPT_JSON');

    // Сценарій 3: Відхилення промісу (асинхронний reject)
    await runPipeline('3. Async Reject', 'INVALID_ID');

    // Бонус: Демонстрація process.on('unhandledRejection', ...)
    console.log('\n--- Running Scenario: 4. Unhandled Rejection (Bonus) ---');
    // Генеруємо "забутий" проміс без .catch()
    Promise.reject(new Error('This rejection slipped through the cracks!'));
}

bootstrap();
