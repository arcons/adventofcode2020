const fs = require('fs')
 
var contents = fs.readFileSync('./day1/input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/);
var sum = 0
var a = 0
var b = 0
input.forEach((cur, curI)=> {
  for(i = curI+1; i < input.length; i++) {
    if((parseInt(cur) + parseInt(input[i])) == 2020) {
      console.log(cur, input[i])
      a = cur;
      b = input[i];
    }
  }
})

console.log(a * b)