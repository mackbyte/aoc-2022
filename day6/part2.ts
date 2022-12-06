import {getInputLines} from "../common/inputUtils";
import {findEndOfFirstSetOfUniqueCharacters} from "./part1";

export default function part2(): number | string {
    const stream = getInputLines(6)[0];
    return findEndOfFirstSetOfUniqueCharacters(stream, 14);
}