import { parse } from "csv-parse";
import fs from 'node:fs';
import { database, Routes } from "../routes/routes.js";

export async function ImportCSV(req, res) {
    const strems = fs.createReadStream('CSV 2.0.csv');

    const parser = parse({
        delimiter: ';',
        trim: true,
        columns: true,
        skip_empty_lines: true,
        columns: header =>
            header.map(col => col.replace(/^\uFEFF/, '')),

    })

    const route = Routes.find(route => route.method === 'POST');

    for await(const chunk of strems.pipe(parser)) {
        req.body = chunk;
        route.handler(req, res)
    }

    return true;
}