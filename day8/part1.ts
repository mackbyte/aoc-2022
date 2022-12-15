import {getInputLines} from "../common/inputUtils";

function printTrees(width: number, height: number, trees: Map<string, boolean>) {
    const output: string[] = [];
    for(let i = 0; i < height; i++) {
        output.push('F'.repeat(width));
    }

    trees.forEach((value, coordinate) => {
        let [x,y] = coordinate.split("-");
        let row = parseInt(y);
        let column = parseInt(x);
        output[row] = output[row].substring(0, column) + "T" + output[row].substring(column + 1);
    });

    return output.join("\n");
}

export function constructTreeGrid(treeLines: string[]): number[][] {
    const trees: number[][] = [];

    treeLines.map(treeLine => {
        let treeRow = treeLine.split("").map(tree => parseInt(tree));
        trees.push(treeRow)
    });

    return trees;
}

export default function part1(): number | string {
    const treeLines = getInputLines(8);
    const visibleTreesCoordinates: Map<string, boolean> = new Map<string, boolean>();
    const trees: number[][] = constructTreeGrid(treeLines);

    // scan top
    trees[0].forEach((treeHeight, column) => {
        let currentMax = treeHeight;
        trees.forEach((treeRow, row) => {
            if(row === 0 || treeRow[column] > currentMax) {
                visibleTreesCoordinates.set(`${column}-${row}`, true);
                currentMax = treeRow[column];
            }
        });
    });

    // scan left
    trees.forEach((treeRow, row) => {
        let currentMax = treeRow[0];
        treeRow.forEach((treeHeight, column) => {
            if(column === 0 || treeHeight > currentMax) {
                visibleTreesCoordinates.set(`${column}-${row}`, true);
                currentMax = treeHeight;
            }
        });
    });

    // scan right
    trees.forEach((treeRow, row) => {
        let currentMax = treeRow[treeRow.length-1];
        treeRow.slice().reverse().forEach((treeHeight, column) => {
            if(column === 0 || treeHeight > currentMax) {
                visibleTreesCoordinates.set(`${treeRow.length-column-1}-${row}`, true);
                currentMax = treeHeight;
            }
        });
    });

    // scan bottom
    trees[trees.length-1].forEach((treeHeight, column) => {
        let currentMax = treeHeight;
        trees.slice().reverse().forEach((treeRow, row) => {
            if(row === 0 || treeRow[column] > currentMax) {
                visibleTreesCoordinates.set(`${column}-${trees.length-row-1}`, true);
                currentMax = treeRow[column];
            }
        });
    });

    // console.log(printTrees(trees[0].length, trees.length, visibleTreesCoordinates));

    return visibleTreesCoordinates.size;
}