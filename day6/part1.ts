import {getInputLines} from "../common/inputUtils";

export default function part1(): number {
    const stream = getInputLines(6)[0];
    let index = 4;

    while(index < stream.length) {
        if(new Set(stream.substring(index-4, index).split('')).size == 4) {
            return index;
        }

        index++;
    }

    return index;
}