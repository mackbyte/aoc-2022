import {getInputSplitByBlankLines} from "../common/inputUtils";

class Stack {
    id: number
    containers: string[] = []

    constructor(id: number) {
        this.id = id;
    }

    add(...containerIds: string[]) {
        this.containers.push(...containerIds)
    }

    remove(count: number): string[] {
        return this.containers.splice(this.containers.length-count, count);
    }

    top(): string {
        return this.containers[this.containers.length-1]
    }
}

function createStacks(stacksConfig: string): Stack[] {
    const stacksConfigLines = stacksConfig.split('\n').reverse(); // reverse to have stacks from bottom to top
    const stacks: Stack[] = stacksConfigLines.shift()!.trim().split('   ').map(stackId => new Stack(parseInt(stackId)));

    stacksConfigLines.forEach(line => {
        line.match(/.{1,4}/g)!
            .map(container => container.trim())
            .forEach((containerId, index) => {
                if(containerId !== '') {
                    stacks[index].add(containerId.charAt(1))
                }
            })
    });

    return stacks;
}

const instructionRegex = /move (\d+) from (\d+) to (\d+)/

function processInstructions(stacks: Stack[], instructions: string) {
    const instructionList = instructions.split('\n');
    for(let instruction of instructionList) {
        let [_, count, from, to] = instruction.match(instructionRegex)!;
        stacks[parseInt(to)-1].add(...stacks[parseInt(from)-1].remove(parseInt(count)).reverse());
    }
}

export default function part1(): string {
    const [stacksConfig, instructions] = getInputSplitByBlankLines(5)
    const stacks = createStacks(stacksConfig);
    processInstructions(stacks, instructions);

    return stacks.map(stack => stack.top()).join("")
}