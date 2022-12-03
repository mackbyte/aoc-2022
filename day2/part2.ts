import {getInputLines} from "../common/inputUtils";
import {calculateRoundScore, getShape, Shape} from "./part1";

enum RoundResult {
    WIN,
    DRAW,
    LOSS,
    UNKNOWN = 9
}

function getRoundResult(code: string): RoundResult {
    if (code === "X") {
        return RoundResult.LOSS;
    } else if (code === "Y") {
        return RoundResult.DRAW;
    } else if (code === "Z") {
        return RoundResult.WIN;
    }

    return RoundResult.UNKNOWN;
}

function getShapeForResult(opponentShape: Shape, roundResult: RoundResult): Shape {
    if(roundResult === RoundResult.DRAW) {
        return opponentShape;
    } else if(opponentShape === Shape.ROCK) {
        if(roundResult === RoundResult.WIN) {
            return Shape.PAPER;
        }
        return Shape.SCISSORS;
    } else if (opponentShape === Shape.PAPER) {
        if(roundResult === RoundResult.WIN) {
            return Shape.SCISSORS;
        }
        return Shape.ROCK;
    } else if (opponentShape === Shape.SCISSORS) {
        if(roundResult === RoundResult.WIN) {
            return Shape.ROCK;
        }
        return Shape.PAPER;
    }
    return Shape.UNKNOWN;
}

export default function part2(): number {
    const strategyLines = getInputLines(2);

    return strategyLines
        .map((strategy => {
            const [opponent, result] = strategy.split(" ");
            let opponentShape = getShape(opponent);
            return calculateRoundScore(opponentShape, getShapeForResult(opponentShape, getRoundResult(result)));
        }))
        .reduce((total, current) => total + current, 0)
}