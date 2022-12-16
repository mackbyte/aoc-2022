import {getInputLines} from "../common/inputUtils";

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export function getDirection(symbol: string): Direction {
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

export type Position = {
    x: number,
    y: number
}

export function positionToString(pos: Position): string {
    return `${pos.x}-${pos.y}`
}

export function updateTailPosition(tail: Position, head: Position): Position {
    let xDiff = Math.abs(tail.x-head.x);
    let yDiff = Math.abs(tail.y - head.y);
    const dist = xDiff + yDiff; // Manhattan distance

    if(dist < 2) {
        // Definitely adjacent, don't move tail
        return tail;
    } else if (dist === 2) {
        if(tail.x === head.x) {
            // 2 away on y axis, decrease distance to 1
            return {
                x: tail.x,
                y: tail.y > head.y ? tail.y - 1 : tail.y + 1
            }
        } else if(tail.y === head.y) {
            // 2 away on x axis, decrease distance to 1
            return {
                x: tail.x > head.x ? tail.x - 1 : tail.x + 1,
                y: tail.y
            }
        } else {
            // 1 away diagonally which counts as adjacent, don't move tail
            return tail;
        }
    } else {
        // Greater than 2 total distance away, must move diagonally by changing x and y by 1
        if(xDiff === 1 && yDiff === 2) {
            // xDiff will now be 0, yDiff still 1 away
            return {
                x: head.x,
                y: tail.y + ((head.y-tail.y) * 0.5)
            }
        } else if(yDiff === 1 && xDiff === 2) {
            // yDiff will now be 0, xDiff still 1 away
            return {
                x: tail.x + ((head.x-tail.x) * 0.5),
                y: head.y
            }
        } else {
            // xDiff and yDiff still 1 away, positioned diagonally
            return {
                x: tail.x + ((head.x-tail.x) * 0.5),
                y: tail.y + ((head.y-tail.y) * 0.5)
            }
        }
    }
}

export function move(pos: Position, dir: Direction): Position {
    if(dir === Direction.UP) {
        return {x: pos.x, y: pos.y+1}
    } else if(dir === Direction.DOWN) {
        return {x: pos.x, y: pos.y-1}
    }else if(dir === Direction.LEFT) {
        return {x: pos.x-1, y: pos.y}
    } else {
        return {x: pos.x+1, y: pos.y}
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

        for(let i = 0; i < value; i++) {
            head = move(head, direction);
            tail = updateTailPosition(tail, head);
            let positionKey = positionToString(tail);
            positions.set(positionKey, (positions.get(positionKey) || 0) + 1);
        }
    });

    return positions.size;
}