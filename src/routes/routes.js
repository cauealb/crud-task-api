import { DataBase } from "../database.js"
import { randomUUID } from 'node:crypto'

const database = new DataBase()

export const Routes = [
    {
        method: 'GET',
        url: '/tasks',
        handler: (req, res) => {
            const tasks = database.select('tasks');
            res.writeHead(200).end(JSON.stringify(tasks));
        }
    },
    {
        method: 'POST',
        url: '/tasks',
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
    {}
]