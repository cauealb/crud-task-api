import { DataBase } from "../database.js"

const database = new DataBase()

export const Routes = [
    {
        method: 'POST',
        url: '/task',
        handler: (req, res) => {
            console.log(req.body)

            res.writeHead(201).end("Usuário criado com sucesso!")
        }
    },
    {},
    {}
]