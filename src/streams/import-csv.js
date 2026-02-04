import { parse } from "csv-parse";
import fs from 'node:fs';

export async function ImportCSV() {
    const strems = fs.createReadStream('CSV 2.0.csv');

    const parser = parse({
        delimiter: ';',
        trim: true,
        columns: true,
        skip_empty_lines: true
    })

    for await(const chunk of strems.pipe(parser)) {
        console.log(chunk);
    }
}