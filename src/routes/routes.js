import { DataBase } from "../database.js"
import { randomUUID } from 'node:crypto'
import { BuildRouteParams } from "../utils/build-route-params.js"
import { ImportCSV } from "../streams/import-csv.js"

const database = new DataBase()

export const Routes = [
    {
        method: 'GET',
        url: BuildRouteParams('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks', req.query ? req.query : {});
            res.writeHead(200).end(JSON.stringify(tasks));
        }
    },
    {
        method: 'POST',
        url: BuildRouteParams('/tasks'),
        handler: async (req, res) => {

            if (req.body) {
                const { title, description } = req.body;
                const task = { title, description }
                
                database.insert('tasks', task);
                res.writeHead(201).end("Task criado com sucesso!")
            } else {

                await ImportCSV()
                res.writeHead(201).end("Tasks criadas com sucesso!");
                return;
            }
        }
    },
    {
        method: 'DELETE',
        url: BuildRouteParams('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const answer = database.delete('tasks', id);

            if (answer) {
                res.writeHead(204).end()
                return;
            }

            res.writeHead(404).end('Esse ID não existe no banco de dados!');
        }
    },
    {
        method: 'PUT',
        url: BuildRouteParams('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description} = req.body;
            const task = { id, title, description }

            const answer = database.atualizar('tasks', task);

            if (answer) {
                res.writeHead(204).end();
                return;
            }

            res.writeHead(404).end("Esse ID não existe no banco de dados!");
        }
    },
    {
        method: 'PATCH',
        url: BuildRouteParams('/tasks/:id/completedat'),
        handler: (req, res) => {
            const { id } = req.params;
            const answer = database.atualizar_status_completado('tasks', id);

            if (answer) {
                res.writeHead(204).end();
                return
            }

            res.writeHead(404).end("Esse ID não existe no banco de dados!")
        }
    }
]