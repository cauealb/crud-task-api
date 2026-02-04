import { parse } from "csv-parse";
import fs from 'node:fs';
import { database } from "../routes/routes.js";

export async function ImportCSV() {
    const strems = fs.createReadStream('CSV 2.0.csv');

    const parser = parse({
        delimiter: ';',
        trim: true,
        columns: true,
        skip_empty_lines: true,
        columns: header =>
            header.map(col => col.replace(/^\uFEFF/, '')),

    })

    for await(const chunk of strems.pipe(parser)) {
        await new Promise(resolve => { 
            setTimeout(() => {
                database.insert('tasks', chunk)
                resolve();
            }, 100)
        })
    }

    return false;
}