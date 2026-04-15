const http = require('node:http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  } else if (method === 'POST' && url === '/echo') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        // Attempt to parse the JSON to validate it, and also to format the response if needed.
        // The requirements say return the same JSON (echo). 
        // We parse and stringify to validate and ensure valid JSON is going back.
        const parsedBody = JSON.parse(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(parsedBody));
      } catch (err) {
        // If JSON.parse throws an error, it is invalid JSON
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
