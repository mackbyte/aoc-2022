import {readFileSync} from 'fs';
import {resolve} from "path";

function getInputLines(day: number): string[] {
    return readFileSync(resolve(__dirname, `../day${day}/input`), 'utf8')
        .split("\n")
        .filter(value => !!value.trim())
}

function getInputSplitByBlankLines(day: number): string[] {
    return readFileSync(resolve(__dirname, `../day${day}/input`), 'utf8')
        .split("\n\n")
        .map(value => value.trim())
}

export {
    getInputLines,
    getInputSplitByBlankLines
}