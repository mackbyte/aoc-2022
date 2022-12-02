import {getInputSplitByBlankLines} from "../common/inputUtils";

export function getTotalCaloriesForEachElf(elvesCalories: string[]) {
    return elvesCalories.map(elfCalories => elfCalories.split("\n"))
        .map(elfCaloriesLines =>
            elfCaloriesLines.map(calorie => parseInt(calorie))
                .reduce((total, current) => total + current, 0)
        );
}

export default function part1(): number {
    const elvesCalories = getInputSplitByBlankLines(1)

    return Math.max(
        ...getTotalCaloriesForEachElf(elvesCalories)
    );
}