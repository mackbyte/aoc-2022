import {getInputLines} from "../common/inputUtils";
import {calculateDirectorySize, constructDirectoryTree} from "./part1";

export default function part2(): number | string {
    const instructions = getInputLines(7);
    const root = constructDirectoryTree(instructions);

    const directorySizes: any = {}
    calculateDirectorySize(directorySizes, "/", root);

    const TOTAL_SIZE = 70000000;
    const currentlyUnused = TOTAL_SIZE - directorySizes["/"];
    const requiredSpace = 30000000 - currentlyUnused;

    return Object.values<number>(directorySizes)
        .filter(size => size >= requiredSpace)
        .sort((a, b) => a - b)
        [0];
}