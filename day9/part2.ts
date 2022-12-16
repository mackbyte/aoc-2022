import {getInputLines} from "../common/inputUtils";
import {Direction, getDirection, Position, positionToString} from "./part1";

function updateTailPosition(tail: Position, head: Position): Position {
    let xDiff = Math.abs(tail.x-head.x);
    let yDiff = Math.abs(tail.y - head.y);
    const dist = xDiff + yDiff;

    if(dist < 2) {
        return tail;
    } else if (dist === 2) {
        if(tail.x === head.x) {
            return {
                x: tail.x,
                y: tail.y > head.y ? tail.y - 1 : tail.y + 1
            }
        } else if(tail.y === head.y) {
            return {
                x: tail.x > head.x ? tail.x - 1 : tail.x + 1,
                y: tail.y
            }
        } else {
            return tail;
        }
    } else {
        if(xDiff === 1 && yDiff === 2) {
            return {
                x: head.x,
                y: tail.y + ((head.y-tail.y) * 0.5)
            }
        } else if(yDiff === 1 && xDiff === 2) {
            return {
                x: tail.x + ((head.x-tail.x) * 0.5),
                y: head.y
            }
        } else {
            return {
                x: tail.x + ((head.x-tail.x) * 0.5),
                y: tail.y + ((head.y-tail.y) * 0.5)
            }
        }
    }
}

export default function part2(): number | string {
    const instructions = getInputLines(9);
    let parts: Position[] = new Array(10).fill(null).map(() => ({x: 0, y: 0}));
    let positions: Map<string, number> = new Map<string, number>();

    instructions.forEach(instruction => {
        const [dirSymbol, val] = instruction.split(" ");
        const direction = getDirection(dirSymbol);
        const value = parseInt(val);

        if(direction === Direction.UP) {
            for(let i = 0; i < value; i++) {
                parts[0].y += 1;
                for(let j = 1; j < parts.length; j++) {
                    parts[j] = updateTailPosition(parts[j], parts[j-1]);
                }
                let positionKey = positionToString(parts[parts.length-1]);
                positions.set(positionKey, (positions.get(positionKey) || 0) + 1);
            }
        } else if (direction === Direction.DOWN) {
            for(let i = 0; i < value; i++) {
                parts[0].y -= 1;
                for(let j = 1; j < parts.length; j++) {
                    parts[j] = updateTailPosition(parts[j], parts[j-1]);
                }
                let positionKey = positionToString(parts[parts.length-1]);
                positions.set(positionKey, (positions.get(positionKey) || 0) + 1);
            }
        } else if (direction === Direction.LEFT) {
            for(let i = 0; i < value; i++) {
                parts[0].x -= 1;
                for(let j = 1; j < parts.length; j++) {
                    parts[j] = updateTailPosition(parts[j], parts[j-1]);
                }
                let positionKey = positionToString(parts[parts.length-1]);
                positions.set(positionKey, (positions.get(positionKey) || 0) + 1);
            }
        } else {
            for(let i = 0; i < value; i++) {
                parts[0].x += 1;
                for(let j = 1; j < parts.length; j++) {
                    parts[j] = updateTailPosition(parts[j], parts[j-1]);
                }
                let positionKey = positionToString(parts[parts.length-1]);
                positions.set(positionKey, (positions.get(positionKey) || 0) + 1);
            }
        }
    });

    return positions.size;
}