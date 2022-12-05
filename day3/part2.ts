import {getInputLinesInGroups} from "../common/inputUtils";
import {getPriorityForItem} from "./part1";

function findCommonItemInGroup(rucksackGroup: string[]): string {
    return [...rucksackGroup[0]].filter(item => rucksackGroup[1].indexOf(item) > -1)
        .filter(item => rucksackGroup[2].indexOf(item) > -1)[0];
}

export default function part2(): number {
    const rucksackGroups: string[][] = getInputLinesInGroups(3, 3);

    return rucksackGroups.map(rucksackGroup => findCommonItemInGroup(rucksackGroup))
        .map(item => getPriorityForItem(item))
        .reduce((total, current) => total + current, 0)
}