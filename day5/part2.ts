import {getInputSplitByBlankLines} from "../common/inputUtils";
import {createStacks, instructionRegex, Stack} from "./part1";

function processInstructions(stacks: Stack[], instructions: string) {
    const instructionList = instructions.split('\n');
    for(let instruction of instructionList) {
        let [_, count, from, to] = instruction.match(instructionRegex)!;
        stacks[parseInt(to)-1].add(...stacks[parseInt(from)-1].remove(parseInt(count)));
    }
}

export default function part2(): any {
    const [stacksConfig, instructions] = getInputSplitByBlankLines(5)
    const stacks = createStacks(stacksConfig);
    processInstructions(stacks, instructions);

    return stacks.map(stack => stack.top()).join("")
}