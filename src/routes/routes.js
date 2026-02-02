import { DataBase } from "../database.js"

const database = new DataBase()

export const Routes = [
    {
        method: 'POST',
        url: '/task',
        handler: (req, res) => {

            res.writeHead(201).end("Usuário criado com sucesso!")
        }
    },
    {},
    {}
]