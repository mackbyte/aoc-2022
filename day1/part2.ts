import {getInputSplitByBlankLines} from "../common/inputUtils";
import {getTotalCaloriesForEachElf} from "./part1";

export default function part2(): number {
    const elvesCalories = getInputSplitByBlankLines(1)
    const elfCalorieTotals = getTotalCaloriesForEachElf(elvesCalories);

    const topThree: number[] = [0,0,0]

    for(let total of elfCalorieTotals) {
        if(total > topThree[0]) {
            topThree[0] = total;
            topThree.sort();
        }
    }

    return topThree.reduce((total, current) => total + current, 0);
}