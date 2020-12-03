const fs = require('fs')
 
var contents = fs.readFileSync('./day3/testinput.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/).map((x)=> x.split(''));
var wraps = 0
var total = 0;
x = 0
y = 0;
while(y < input.length) {
  y += 1
  x += 3
  // Check if it needs to be bumped to the next row 
  if(y == input.length) {
    break
  }
  currPos = input[y][x];
  if(currPos === '#') {
    total++
  }
  if(x === input[y].length-1) {
    wraps++
    x=0
  }
}
console.log(wraps)
console.log("Total trees", total)