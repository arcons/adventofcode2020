const fs = require('fs')
 
var contents = fs.readFileSync('./day3/input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/).map((x)=> x.split(''));

const trees = (input, slopex, slopey) => {
  let total = 0;
  x = 0;
  y = 0;
  while(y < input.length) {
    x += slopex
    y += slopey
    if(!input[y] || y == input.length) {
      break
    }
    // Check if it needs to carry over
    if(x > input[y].length-1) {
      x = x % input[y].length
    }
    currPos = input[y][x];
    
    if(currPos == '#') {
      total++
    }
  }
  return total
}

console.log("Total trees", trees(input, 1,1))
console.log("Total trees", trees(input, 3,1))
console.log("Total trees", trees(input, 5,1))
console.log("Total trees", trees(input, 7,1))
console.log("Total trees", trees(input, 1,2))
console.log(trees(input, 1,1) * trees(input, 3,1) * trees(input, 5,1) * trees(input, 7,1) * trees(input, 1,2))