import { DataBase } from "../database.js"
import { randomUUID } from 'node:crypto'
import { BuildRouteParams } from "../utils/build-route-params.js"

const database = new DataBase()

export const Routes = [
    {
        method: 'GET',
        url: BuildRouteParams('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks');
            res.writeHead(200).end(JSON.stringify(tasks));
        }
    },
    {
        method: 'POST',
        url: BuildRouteParams('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body;

            const task = {
                id: randomUUID(),
                title, 
                description, 
                completed_at: null,
                created_at: new Date().toLocaleDateString('pt-BR'),
                updated_at: null
            }

            database.insert('tasks', task);

            res.writeHead(201).end("Task criado com sucesso!")
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
        url: '/tasks/:id',
        handler: (req, res) => {
            
        }
    }
]