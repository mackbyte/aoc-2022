import {getInputLines} from "../common/inputUtils";
import {getDirection, move, Position, positionToString, updateTailPosition} from "./part1";

export default function part2(): number | string {
    const instructions = getInputLines(9);
    let parts: Position[] = new Array(10).fill(null).map(() => ({x: 0, y: 0}));
    let positions: Map<string, number> = new Map<string, number>();

    instructions.forEach(instruction => {
        const [dirSymbol, val] = instruction.split(" ");
        const direction = getDirection(dirSymbol);
        const value = parseInt(val);

        for(let i = 0; i < value; i++) {
            parts[0] = move(parts[0], direction);
            for(let j = 1; j < parts.length; j++) {
                parts[j] = updateTailPosition(parts[j], parts[j-1]);
            }
            let positionKey = positionToString(parts[parts.length-1]);
            positions.set(positionKey, (positions.get(positionKey) || 0) + 1);
        }
    });

    return positions.size;
}