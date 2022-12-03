import {getInputLines} from "../common/inputUtils";

export enum Shape {
    ROCK = 1,
    PAPER = 2,
    SCISSORS = 3,
    UNKNOWN = 9
}

export function getShape(code: string): Shape {
    if (code === "A" || code === "X") {
        return Shape.ROCK;
    } else if (code === "B" || code === "Y") {
        return Shape.PAPER;
    } else if (code === "C" || code === "Z") {
        return Shape.SCISSORS;
    }

    return Shape.UNKNOWN;
}

export function calculateRoundScore(opponentShape: Shape, myShape: Shape) {
    if (opponentShape === myShape) {
        // draw
        return 3 + myShape;
    }

    // win
    if (opponentShape === Shape.ROCK && myShape === Shape.PAPER
        || opponentShape === Shape.PAPER && myShape === Shape.SCISSORS
        || opponentShape === Shape.SCISSORS && myShape === Shape.ROCK) {
        return 6 + myShape;
    }

    // loss
    return myShape;
}

export default function part1(): number {
    const strategyLines = getInputLines(2);

    return strategyLines
        .map((strategy => {
            const [opponent, me] = strategy.split(" ");
            return calculateRoundScore(getShape(opponent), getShape(me));
        }))
        .reduce((total, current) => total + current, 0)
}