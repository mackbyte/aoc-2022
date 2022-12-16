import {getInputLines} from "../common/inputUtils";

enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

function getDirection(symbol: string): Direction {
    if(symbol === "U") {
        return Direction.UP;
    } else if (symbol === "D") {
        return  Direction.DOWN;
    } else if (symbol === "L") {
        return  Direction.LEFT
    } else {
        return Direction.RIGHT;
    }
}

type Position = {
    x: number,
    y: number
}

function positionToString(pos: Position): string {
    return `${pos.x}-${pos.y}`
}

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
        if(xDiff === 1) {
            return {
                x: head.x,
                y: tail.y + ((head.y-tail.y) * 0.5)
            }
        } else {
            return {
                x: tail.x + ((head.x-tail.x) * 0.5),
                y: head.y
            }
        }
    }
}

export default function part1(): number | string {
    const instructions = getInputLines(9);
    let head: Position = {x: 0, y: 0};
    let tail: Position = {x: 0, y: 0};
    let positions: Map<string, number> = new Map<string, number>();

    instructions.forEach(instruction => {
        const [dirSymbol, val] = instruction.split(" ");
        const direction = getDirection(dirSymbol);
        const value = parseInt(val);

        if(direction === Direction.UP) {
            for(let i = 0; i < value; i++) {
                head.y += 1;
                tail = updateTailPosition(tail, head);
                let positionKey = positionToString(tail);
                positions.set(positionKey, (positions.get(positionKey) || 0) + 1);
            }
        } else if (direction === Direction.DOWN) {
            for(let i = 0; i < value; i++) {
                head.y -= 1;
                tail = updateTailPosition(tail, head);
                let positionKey = positionToString(tail);
                positions.set(positionKey, (positions.get(positionKey) || 0) + 1);
            }
        } else if (direction === Direction.LEFT) {
            for(let i = 0; i < value; i++) {
                head.x -= 1;
                tail = updateTailPosition(tail, head);
                let positionKey = positionToString(tail);
                positions.set(positionKey, (positions.get(positionKey) || 0) + 1);
            }
        } else {
            for(let i = 0; i < value; i++) {
                head.x += 1;
                tail = updateTailPosition(tail, head);
                let positionKey = positionToString(tail);
                positions.set(positionKey, (positions.get(positionKey) || 0) + 1);
            }
        }
    });

    return positions.size;
}