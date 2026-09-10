const http = require('http');

// In-memory storage for POST /data
let savedData = null;

const server = http.createServer((req, res) => {
  // Enable CORS for testing with browsers/curl
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Welcome to Node.js Server!' }));
  } else if (req.method === 'GET' && req.url === '/about') {
    res.writeHead(200);
    res.end(JSON.stringify({ course: 'Full Stack Development', lab: 'Node.js Server' }));
  } else if (req.method === 'GET' && req.url === '/data') {
    res.writeHead(200);
    if (savedData === null) {
      res.end(JSON.stringify({ message: 'No data yet', data: null }));
    } else {
      res.end(JSON.stringify(savedData));
    }
  } else if (req.method === 'POST' && req.url === '/data') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        savedData = parsed;
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Data saved successfully', received: parsed, data: savedData }));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
