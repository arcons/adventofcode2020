const fs = require('fs')
 
var contents = fs.readFileSync('./day19/testinput.txt', 'utf8');
// example parse
const input = contents.split(/\n\s*\n/).map((str) => str.split(/\n+/))

console.log(input)
console.log("done")