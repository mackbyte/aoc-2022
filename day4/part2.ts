import {getInputLines} from "../common/inputUtils";
import {getRangesFromLine, Range} from "./part1";

function isRangeIntersecting(first: Range, second: Range) {
    const min = first.start < second.start ? first : second;
    const max = first === min ? second : first;

    return max.start <= min.end;
}

export default function part2(): number {
    const rangeLines = getInputLines(4);

    return rangeLines.map(line => getRangesFromLine(line))
        .filter(ranges => isRangeIntersecting(ranges[0], ranges[1]))
        // .map(ranges => `${ranges[0].start}-${ranges[0].end},${ranges[1].start}-${ranges[1].end}`)
        .length
}