import http from 'node:http';

const server = http.createServer((req, res) => {
    res.end("Olá");
})

server.listen(3434);