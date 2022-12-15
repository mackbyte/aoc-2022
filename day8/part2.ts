import {getInputLines} from "../common/inputUtils";
import {constructTreeGrid} from "./part1";

function calculateScenicScore(trees: number[][], row: number, column: number): number {
    const treeHeight = trees[row][column];
    let up = row,
        left = column,
        right = (trees[row].length-1) - column,
        down = (trees.length-1) - row;

    // scan up
    let curRow = row-1;
    while(curRow >= 0) {
        if(trees[curRow][column] >= treeHeight) {
            up = row - curRow;
            break;
        }
        curRow--;
    }

    // scan left
    let curColumn = column-1;
    while(curColumn >= 0) {
        if(trees[row][curColumn] >= treeHeight) {
            left = column - curColumn;
            break;
        }
        curColumn--;
    }

    // scan right
    curColumn = column+1;
    while(curColumn < trees[row].length) {
        if(trees[row][curColumn] >= treeHeight) {
            right = curColumn - column;
            break;
        }
        curColumn++;
    }

    // scan down
    curRow = row+1;
    while(curRow < trees.length) {
        if(trees[curRow][column] >= treeHeight) {
            down = curRow - row;
            break;
        }
        curRow++;
    }

    return up * left * right * down;
}

export default function part2(): number | string {
    const treeLines = getInputLines(8);
    const trees: number[][] = constructTreeGrid(treeLines);
    let maxScenicScore: number = -1;

    trees.forEach((treeRow, row) => {
        treeRow.forEach((tree, column) => {
            let score = calculateScenicScore(trees, row, column);
            if(score > maxScenicScore) {
                maxScenicScore = score;
            }
        });
    });

    return maxScenicScore;
}