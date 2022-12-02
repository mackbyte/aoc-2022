import {getInputSplitByBlankLines} from "../common/inputUtils";

export default function part1(): number {
    const elvesCalories = getInputSplitByBlankLines(1)

    return Math.max(
        ...elvesCalories.map(elfCalories => elfCalories.split("\n"))
            .map(elfCaloriesLines =>
                elfCaloriesLines.map(calorie => parseInt(calorie))
                    .reduce((total, current) => {
                        return total + current;
                    }, 0)
            )
    );
}