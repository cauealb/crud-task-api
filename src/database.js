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
        const index = this.#database[table].findIndex(task => task.id === id);

        if(index > -1) {
            this.#database[table].splice(index, 1);
            return true;
        }

        return false;
    }

    atualizar(table, id, data) {
        // 1 - Tabela, id e data
        // 2 - Atulizar a task conforme o que vem da body
        // 3 - Se não achar o id, informar
        // 4 - Task atualizada

        // Verificar se o id está no array - x
        // Se tiver, atuliza, se não informa

        const index = this.#database[table].findIndex(task => task.id === id);

        if (index > -1) {
            this.#database[table][index] = data;
            return true;
        }

        return false;
    }
}