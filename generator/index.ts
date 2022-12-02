import {access, mkdir, readFile, writeFile} from 'fs/promises';
import path from "path";
import {constants} from "fs";

if (process.argv.length !== 4) {
    console.log("Usage: npm run generate [day] [part]")
    process.exit(1)
}

const [, , day, part] = process.argv;

const dayNum = parseInt(day),
    partNum = parseInt(part);

const dayDirectory = path.join(__dirname, `../../day${dayNum}`);
access(dayDirectory, constants.R_OK | constants.W_OK)
    .catch(() => mkdir(dayDirectory))

const partFile = path.join(dayDirectory, `/part${partNum}.ts`);
readFile(path.join(__dirname, '/partTemplate.ts.template'), 'utf-8')
    .then(templateAsString => {
        if (templateAsString) {
            return writeFile(partFile, templateAsString.replace('<PARTNUM>', `${partNum}`), 'utf-8')
        }
    });

const indexFile = path.join(dayDirectory, `/index.ts`);
readFile(indexFile, 'utf-8')
    .then(indexAsString => {
        if(indexAsString) {
            const lines = indexAsString.split('\n');
            lines.push(`export {default as part${partNum}} from "./part${partNum}"`)
            lines.sort();
            return writeFile(indexFile, lines.join('\n'), 'utf-8');
        }
    })
    .catch(() => writeFile(indexFile, `export {default as part${partNum}} from "./part${partNum}"`, 'utf-8'))