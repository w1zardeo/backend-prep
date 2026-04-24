const fs = require('fs');
const { Transform } = require('node:stream');
const { pipeline } = require('node:stream/promises'); // Обираємо сучасний варіант з Промісами
const path = require('path');

const inputFile = path.join(__dirname, 'input.txt');
const outputFile = path.join(__dirname, 'output.txt');

// Наш власний Transform стрім
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // chunk приходить як Buffer. Перетворюємо його у рядок, робимо UpperCase 
    // і передаємо далі по конвеєру через this.push()
    const upperCased = chunk.toString().toUpperCase();
    this.push(upperCased);
    
    // callback сигналізує, що обробка цього конкретного chunk завершена
    callback();
  }
});

async function runTransformation() {
  console.log('🔄 Починаємо обробку файлу через стріми...');

  // Створюємо стріми замість того, щоб вантажити файл цілком у пам'ять
  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);

  try {
    // Використовуємо pipeline замість .pipe()
    // Це безпечніше, оскільки pipeline коректно очищає пам'ять 
    // та автоматично закриває усі стріми (destroy) у разі будь-якої помилки.
    await pipeline(
      readStream,
      upperCaseTransform,
      writeStream
    );
    console.log('✅ Трансформація успішно завершена! Результат збережено у файл output.txt');
  } catch (err) {
    // Централізована обробка помилок у всьому стрім-ланцюжку
    if (err.code === 'ENOENT') {
      console.error(`❌ Помилка: Вхідний файл не знайдено! (${err.path})`);
      console.error('   👉 Переконайтеся, що файл input.txt існує у тій самій директорії.');
    } else {
      console.error('❌ Виникла неочікувана помилка стріму:', err.message);
    }
  }
}

runTransformation();
