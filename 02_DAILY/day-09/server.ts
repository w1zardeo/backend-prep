import * as http from 'node:http';
import { User, isCreateUserDto } from './user.types.js';
import { users, incrementId, getUserById } from './user.service.js';
import { isSuccess } from './result.js';

/**
 * Хелпер для обіцянки-парсера, який повертає unknown
 * (ми не знаємо, що прислав клієнт, доки не провалідуємо)
 */
function parseJsonBody(req: http.IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      if (!body) return resolve({}); 
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('INVALID_JSON'));
      }
    });
    
    req.on('error', reject);
  });
}

const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { method, url } = req;
  
  try {
    // POST /users
    if (method === 'POST' && url === '/users') {
      // TypeScript знає, що parsedData має тип "unknown"
      const parsedData = await parseJsonBody(req);
      
      // 🚀 RUNTIME VALIDATION
      // Завдяки нашій Type Guard функції isCreateUserDto...
      if (!isCreateUserDto(parsedData)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            error: 'Bad Request: "name" and "email" must be non-empty strings' 
        }));
        return;
      }
      
      // ...від цього рядка і нижче TypeScript на 100% гарантує, 
      // що parsedData — це CreateUserDto. Він навіть автодоповнює .name та .email!
      const { name, email } = parsedData;

      // Перевірка на унікальність email
      for (const existingUser of users.values()) {
        if (existingUser.email === email) {
          res.writeHead(409, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: `User with email ${email} already exists (Conflict)` }));
          return;
        }
      }

      // Створення
      const id = incrementId();
      const newUser: User = { id, name, email };
      
      users.set(id, newUser);

      // Відповідь
      res.writeHead(201, {
        'Content-Type': 'application/json',
        'Location': `/users/${id}`
      });
      res.end(JSON.stringify(newUser));
      return;
    }

    // GET /users/:id
    if (method === 'GET' && url?.startsWith('/users/')) {
      const id = url.split('/')[2];
      if (id) {
        const result = getUserById(id);
        
        if (isSuccess(result)) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result.data));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: result.error }));
        }
        return;
      }
    }

    // Всі інші Routes, які не цікавлять нас в рамках цього демо
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
    
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_JSON') {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: "Bad Request: JSON cannot be parsed" }));
      return;
    }

    console.error('Unhandled server error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
});

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`🛡️ TypeScript Server is running on http://localhost:${PORT}`);
});
