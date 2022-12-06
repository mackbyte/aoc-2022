import {getInputLines} from "../common/inputUtils";

type Range = {
    start: number
    end: number
}

const rangesRegex = /(\d+)-(\d+),(\d+)-(\d+)/

function getRangesFromLine(line: string): Range[] {
    let match = line.match(rangesRegex);
    if(match) {
        const first: Range = {start: parseInt(match[1]), end: parseInt(match[2])}
        const second: Range = {start: parseInt(match[3]), end: parseInt(match[4])}
        return [first, second]
    }

    return [];
}

function isRangeOverlapping(first: Range, second: Range) {
    if(first.start === second.start || first.end === second.end) {
        return true;
    } else if (first.start < second.start) {
        return first.end >= second.end;
    } else {
        return first.end <= second.end;
    }
}

export default function part1(): number {
    const rangeLines = getInputLines(4);

    return rangeLines.map(line => getRangesFromLine(line))
        .filter(ranges => isRangeOverlapping(ranges[0], ranges[1]))
        // .map(ranges => `${ranges[0].start}-${ranges[0].end},${ranges[1].start}-${ranges[1].end}`)
        .length
}