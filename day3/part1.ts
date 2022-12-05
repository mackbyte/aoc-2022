import {getInputLines} from "../common/inputUtils";

function findCommonItem(rucksack: string) {
    const firstCompartment: string[] = rucksack.slice(0, rucksack.length / 2).split('');
    const secondCompartment: string[] = rucksack.slice(rucksack.length / 2, rucksack.length).split('');

    return firstCompartment.filter(item => secondCompartment.indexOf(item) > -1)[0];
}

// A-Z 65-90
// a-z 97-122
function getPriorityForItem(item: string) {
    const charCode = item.charCodeAt(0);
    if (charCode < 91) {
        return charCode - 38; // map 65-90 to 27-52
    }
    return charCode - 96; // map 97-122 to 1-26
}

export default function part1(): number {
    const rucksacks = getInputLines(3);

    return rucksacks.map(rucksack => findCommonItem(rucksack))
        .map(item => getPriorityForItem(item))
        .reduce((total, current) => total + current, 0)
}