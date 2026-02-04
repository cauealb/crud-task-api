import { parse } from "csv-parse";
import fs from 'node:fs';
import { DataBase } from "../database.js";

const database = new DataBase();

export async function ImportCSV() {
    const strems = fs.createReadStream('CSV 2.0.csv');

    const parser = parse({
        delimiter: ';',
        trim: true,
        columns: true,
        skip_empty_lines: true,

    })

    for await(const chunk of strems.pipe(parser)) {
        await new Promise(resolve => {
            setTimeout(() => {
                console.log('ola') 
                database.insert('tasks', chunk) 
                resolve();
            }, 500);
        })
    }

    return false;
}