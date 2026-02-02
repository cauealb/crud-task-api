import { DataBase } from "../database.js"
import { randomUUID } from 'node:crypto'

const database = new DataBase()

export const Routes = [
    {
        method: 'POST',
        url: '/task',
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

            database.insert('task', task);

            res.writeHead(201).end("Usuário criado com sucesso!")
        }
    },
    {
        method: 'GET',
        url: '/task',
        handler: (req, res) => {


            res.writeHead(200).end();
        }
    },
    {}
]