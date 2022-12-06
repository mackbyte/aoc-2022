import {getInputLines} from "../common/inputUtils";

export function findEndOfFirstSetOfUniqueCharacters(stream: string, numUniqueChars: number): number {
    let index = numUniqueChars;

    while(index < stream.length) {
        if(new Set(stream.substring(index-numUniqueChars, index).split('')).size == numUniqueChars) {
            return index;
        }

        index++;
    }

    return index;
}

export default function part1(): number {
    const stream = getInputLines(6)[0];
    return findEndOfFirstSetOfUniqueCharacters(stream, 4);
}