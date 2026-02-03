import fs from 'node:fs/promises';

const dbPath = new URL('db.json', import.meta.url)

export class DataBase {
    #database = {};

    constructor() {
        fs.readFile(dbPath, 'utf8')
            .then(data => {
                this.#database = JSON.parse(data);
            })
            .catch(() => {
                this.#persist();
            })
    }

    #persist() {
        fs.writeFile(dbPath, JSON.stringify(this.#database));
    }

    select(table) {
        const tasks = this.#database[table];
        return tasks;
    }

    insert(table, task) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(task);
        } else {
            this.#database[table] = [task];
        }

        this.#persist();
    }

    delete(table, id) {
        // 1 - Tabela e o id
        // 2 - Verificar se o id está no array, se tiver apagar
        // 3 - Verificar se o id está no array
        // 4 - a task com o id removido

        // validar para ver se o id está no array - x
        // Se tiver apaga, se não tiver retornar um erro - x

        const index = this.#database[table].findIndex(i => i.id === id);

        if(index > -1) {
            this.#database[table].splice(index, 1);
            return true;
        }

        return false;
    }
}