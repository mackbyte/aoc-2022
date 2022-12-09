import {getInputLines} from "../common/inputUtils";

interface File {
    name: string
    size: number
}

interface Directory {
    name: string
    parent: Directory | null
    directories: Directory[]
    files: File[]
}

const changeDirectoryRegex = /\$ cd (.+)/

export function constructDirectoryTree(instructions: string[]): Directory {
    const root: Directory = { name: "/", parent: null, directories: [], files: []}
    let currentDirectory: Directory = root;

    instructions.forEach(instruction => {
        if(instruction.startsWith("$")) {
            let match = instruction.match(changeDirectoryRegex);
            if(match) {
                let changeCommand = match[1];
                if(changeCommand === "/") {
                    currentDirectory = root;
                } else if(changeCommand === "..") {
                    currentDirectory = currentDirectory.parent!;
                } else {
                    currentDirectory = currentDirectory.directories.find(directory => directory.name == changeCommand)!
                }
            }
        } else {
            if(instruction.startsWith("dir")) {
                let dirName = instruction.split(" ")[1];
                if(!currentDirectory.directories.find(directory => directory.name === dirName)) {
                    currentDirectory.directories.push({name: dirName, parent: currentDirectory, directories: [], files: []})
                }
            } else {
                let [size, name] = instruction.split(" ");
                currentDirectory.files.push({name, size: parseInt(size)})
            }
        }
    });

    return root;
}

export function calculateDirectorySize(sizes: any, path: string, directory: Directory) {
    let size = directory.files.reduce((total, file) => total + file.size, 0);
    if(directory.directories.length > 0) {
        directory.directories.forEach(directory => {
            size += calculateDirectorySize(sizes, `${path}/${directory.name}`, directory)
        });
    }
    sizes[path] = size;
    return size;
}

export default function part1(): number | string {
    const instructions = getInputLines(7);
    const root = constructDirectoryTree(instructions);

    const directorySizes = {}
    calculateDirectorySize(directorySizes, "/", root);

    return Object.values<number>(directorySizes)
        .filter(size => size <= 100000)
        .reduce((total, current) => total + current, 0);
}