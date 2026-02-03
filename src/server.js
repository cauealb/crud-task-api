import http from 'node:http';
import { Middleware } from './middleware/middleware.js';
import { Routes } from './routes/routes.js';

const server = http.createServer(async(req, res) => {
    const { method, url } = req;
    await Middleware(req, res);

    const route = Routes.find(index => {
        return index.method === method && index.url.test(url);
    })

    if(route) {
        const routeParams = req.url.match(route.url)
        const { id, ...params } = routeParams.groups

        req.params = id;
        req.query = params ? null : null;


        return route.handler(req, res);
    }

    res.writeHead(404).end("Rota não identificada!");
})

server.listen(3434);