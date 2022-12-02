if(process.argv.length !== 4) {
    console.log("Usage: npm start [day] [part]")
    process.exit(1)
}

const [,, day, part] = process.argv;

const dayNum = parseInt(day),
    partNum = parseInt(part);

import(`./day${dayNum}`).then(day => {
    console.log(day[`part${partNum}`]());
})
