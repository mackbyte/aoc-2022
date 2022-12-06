import {getInputLines} from "../common/inputUtils";

export default function part2(): number | string {
    const stream = getInputLines(6)[0];
    let index = 14;

    while(index < stream.length) {
        if(new Set(stream.substring(index-14, index).split('')).size == 14) {
            return index;
        }

        index++;
    }

    return index;
}