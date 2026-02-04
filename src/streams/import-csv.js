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
        skip_empty_lines: true
    })

    for await(const chunk of strems.pipe(parser)) {
        database.insert('tasks', {...chunk })
    }

    return false;
}