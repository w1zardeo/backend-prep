const http = require('node:http');

// In-memory storage за допомогою Map
const items = new Map();
let currentId = 1;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Парсинг роутів
  if (method === 'POST' && url === '/items') {
    let body = '';

    // Збираємо дані
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        // Спроба розпарсити JSON
        const parsedBody = JSON.parse(body);

        if (!parsedBody.title) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Field "title" is required' }));
        }

        // Генеруємо унікальний ID (у цьому випадку простий інкремент)
        const id = String(currentId++);
        
        const newItem = {
          id,
          title: parsedBody.title
        };

        // Зберігаємо об'єкт у Map
        items.set(id, newItem);

        // Повертаємо статус 201 Created і заголовок Location
        res.writeHead(201, {
          'Content-Type': 'application/json',
          'Location': `/items/${id}`
        });
        res.end(JSON.stringify(newItem));

      } catch (err) {
        // Якщо JSON невалідний
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });

  } else if (method === 'GET' && url.startsWith('/items/')) {
    // Екстракт ID з URL (наприклад: /items/123 -> ["", "items", "123"])
    const parts = url.split('/');
    // Перевіряємо, чи URL відповідає шаблону /items/:id (без додаткових шляхів)
    if (parts.length === 3 && parts[2] !== '') {
      const id = parts[2];

      if (items.has(id)) {
        // Об'єкт знайдено
        const item = items.get(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(item));
      } else {
        // Об'єкт не знайдено
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Item not found' }));
      }
    } else {
      // Якщо шлях /items/ 
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }

  } else {
    // Всі інші невідомі роути
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

// Додав можливість використовувати інший порт, якщо 3000 зайнятий
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('Test commands:');
  console.log(`✅ POST: curl -i -X POST -H "Content-Type: application/json" -d '{"title": "Learn HTTP"}' http://localhost:${PORT}/items`);
  console.log(`✅ GET:  curl -i http://localhost:${PORT}/items/1`);
  console.log(`✅ GET (404): curl -i http://localhost:${PORT}/items/999`);
  console.log(`✅ POST (Error): curl -i -X POST -H "Content-Type: application/json" -d '{"title": "Learn HTTP"' http://localhost:${PORT}/items`);
});
