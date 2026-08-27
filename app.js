const http = require('node:http');

const port = Number.parseInt(process.env.PORT || '8080', 10);
const host = process.env.HOST || '0.0.0.0';

function requestHandler(request, response) {
  if (request.method !== 'GET') {
    response.writeHead(405, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ error: 'method not allowed' }));
    return;
  }

  if (request.url === '/healthz') {
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (request.url === '/') {
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(
      JSON.stringify({
        message: 'Hello World!',
        service: 'hello-world',
        version: process.env.APP_VERSION || 'development',
      }),
    );
    return;
  }

  response.writeHead(404, { 'content-type': 'application/json' });
  response.end(JSON.stringify({ error: 'not found' }));
}

function createServer() {
  return http.createServer(requestHandler);
}

if (require.main === module) {
  createServer().listen(port, host, () => {
    console.log(`hello-world listening on http://${host}:${port}`);
  });
}

module.exports = { createServer, requestHandler };
