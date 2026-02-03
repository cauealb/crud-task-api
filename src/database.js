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

    select(table, query) {
        const { title, description } = query;
        let tasks = this.#database[table];

        if (title || description) {
            tasks = tasks.filter(task => {
                return title ? task.title.toLowerCase().includes(title.toLowerCase()) : true && description ? task.description.toLowerCase().includes(description.toLowerCase()) : true
            })
        }

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
            this.#persist()
            return true;
        }

        return false;
    }

    atualizar(table, data) {
        const index = this.#database[table].findIndex(task => task.id === data.id);

        const newTask = {
            ...this.#database[table][index],
            title: data.title ? data.title : this.#database[table][index].title,
            description: data.description ? data.description : this.#database[table][index].description,
            updated_at: new Date().toLocaleString('pt-BR'),
        }

        if (index > -1) {
            this.#database[table][index] = newTask;
            this.#persist()
            return true;
        }

        return false;
    }

    atualizar_status_completado(table, id) {
        const index = this.#database[table].findIndex(task => task.id === id);

        if (index > -1) {
            const date = this.#database[table][index].completed_at

            this.#database[table][index].completed_at = date ? null : new Date().toLocaleString('pt-BR');
            this.#persist();
            return true;
        }

        return false;
    }
}