import {readFileSync} from 'fs';
import {resolve} from "path";

export function getInputLines(day: number): string[] {
    return readFileSync(resolve(__dirname, `../day${day}/input`), 'utf8')
        .split("\n")
        .filter(value => !!value.trim())
}

export function getInputSplitByBlankLines(day: number): string[] {
    return readFileSync(resolve(__dirname, `../day${day}/input`), 'utf8')
        .split("\n\n")
        .map(value => value.trim())
}

export function getInputLinesInGroups(day: number, groupSize: number): string[][] {
    return readFileSync(resolve(__dirname, `../day${day}/input`), 'utf8')
        .split("\n")
        .map(value => value.trim())
        .filter(value => !!value.trim())
        .reduce((groups: string[][], current: string, index: number) => {
            const chunkIndex = Math.floor(index / groupSize)

            if (!groups[chunkIndex]) {
                groups[chunkIndex] = [] // start a new chunk
            }

            groups[chunkIndex].push(current)

            return groups
        }, [])
}
