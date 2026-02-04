import { DataBase } from "../database.js"
import { BuildRouteParams } from "../utils/build-route-params.js"
import { ImportCSV } from "../streams/import-csv.js"

export const database = new DataBase();

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
            let routineFinish;

            if (!req.body) { 

                routineFinish = false;
                routineFinish = await ImportCSV(req, res);

            } else {
                routineFinish = true;
                const { title, description } = req.body;
            
                if (!title || !description) {
                    res.writeHead(400).end("Dados para criação da task faltando");
                    return
                }

                const task = { title, description }
                database.insert('tasks', task);
                
            }
            
            if (routineFinish) {
                res.writeHead(201).end("Task criado com sucesso!")
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

            if (!title || !description) {
                res.writeHead(400).end("Dados para atualização da task faltando");
                return
            }

            const task = { id, title, description }
            const answer = database.update('tasks', task);

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
            const answer = database.updateCompletedStatus('tasks', id);

            if (answer) {
                res.writeHead(204).end();
                return
            }

            res.writeHead(404).end("Esse ID não existe no banco de dados!")
        }
    }
]