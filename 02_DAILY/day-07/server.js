const http = require('node:http');
const { Readable, Transform } = require('node:stream');

// In-memory Database
const users = new Map();
let currentId = 1;

// Щоб було що віддавати при першому GET-запиті, створимо одразу тестового юзера
users.set('1', { id: '1', name: 'Alice Smith', email: 'alice@example.com' });
currentId++;

// Централізований парсер тіла запиту (разом із глобальним перехопленням невалідного JSON)
const parseJsonBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      if (!body) return resolve({}); // Порожнє тіло це ОК, просто нічого немає
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        // Викидаємо специфічну помилку, яку потім піймаємо в роутері
        const err = new Error('Invalid JSON payload');
        err.name = 'JsonParseError';
        reject(err);
      }
    });
    
    req.on('error', reject);
  });
};

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  
  try {
    // 1. GET /users (Розумна віддача масиву користувачів через стріми)
    if (method === 'GET' && url === '/users') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write('['); // Відкриваємо JSON-масив перед початком стрімінгу
      
      const readableSource = Readable.from(users.values());
      let isFirstElement = true;

      const toJSONStringStream = new Transform({
        writableObjectMode: true, // Щоб пайплайн приймав сирі JavaScript об'єкти
        transform(chunk, encoding, callback) {
          const jsonString = JSON.stringify(chunk);
          if (isFirstElement) {
            isFirstElement = false;
            this.push(jsonString);
          } else {
            this.push(',' + jsonString); // Додаємо кому перед наступними об'єктами
          }
          callback();
        },
        flush(callback) {
          this.push(']'); // Закриваємо JSON-масив, коли всі дані закінчилися
          callback();
        }
      });

      // Перенаправляємо сирі дані з Map -> через трансформацію -> клієнту у респонс
      readableSource.pipe(toJSONStringStream).pipe(res);
      return; 
    }

    // 2. POST /users (Створення нового користувача)
    if (method === 'POST' && url === '/users') {
      // Тут магія: якщо парсинг впаде, ми одразу потрапимо у глобальний catch цього роутера
      const parsedData = await parseJsonBody(req);
      
      if (!parsedData.name || !parsedData.email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: '"name" and "email" are required fields' }));
      }

      // Валідація на існуючий email
      for (const existingUser of users.values()) {
        if (existingUser.email === parsedData.email) {
          res.writeHead(409, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: `User with email ${parsedData.email} already exists (Conflict)` }));
        }
      }

      const id = String(currentId++);
      const newUser = { id, name: parsedData.name, email: parsedData.email };
      
      users.set(id, newUser);

      res.writeHead(201, {
        'Content-Type': 'application/json',
        'Location': `/users/${id}` // Заголовок, куди піти по створений ресурс
      });
      return res.end(JSON.stringify(newUser));
    }

    // 3 & 4. GET /users/:id та DELETE /users/:id
    const userRouteMatch = url.match(/^\/users\/([^\/]+)$/);
    if (userRouteMatch) {
      const targetId = userRouteMatch[1]; // Дістаємо ID

      if (method === 'GET') {
        if (users.has(targetId)) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify(users.get(targetId)));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'User not found' }));
        }
      }

      if (method === 'DELETE') {
        if (users.has(targetId)) {
          users.delete(targetId);
          res.writeHead(204); // No Content — ресурс успішно видалено
          return res.end();
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'User not found' }));
        }
      }
    }

    // Fallback: Невідомий роут
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
    
  } catch (error) {
    if (error.name === 'JsonParseError') {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: "Bad Request: JSON cannot be parsed" }));
    }

    console.error('Unhandled server error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
});

// Використовуватимемо 3002 порт, оскільки попередні ваші сервери найпевніше досі утримують 3000 та 3001
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`⚡️ Users CRUD Server is running on http://localhost:${PORT}`);
});
