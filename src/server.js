import http from 'node:http';
import { Middleware } from './middleware/middleware.js';
import { Routes } from './routes/routes.js';

const server = http.createServer(async(req, res) => {
    await Middleware(req, res);

    const route = Routes.find(index => {
        return;
    })

    res.writeHead(404).end("Rota não indentificada!");
})

server.listen(3434);