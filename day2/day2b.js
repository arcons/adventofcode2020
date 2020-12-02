const fs = require('fs')
 
var contents = fs.readFileSync('./day2/input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/);
var total = 0;

input.forEach(line => {
  // parse and split the input
  var subInputs = line.split(' ')
  var minMax = subInputs[0].split('-')
  var letter = subInputs[1]
  var elfPassword = subInputs[2]
  if(elfPassword[parseInt(minMax[1])-1] === letter[0] || elfPassword[parseInt(minMax[0])-1] === letter[0]) {
    if(elfPassword[parseInt(minMax[1])-1] === letter[0] && elfPassword[parseInt(minMax[0])-1] === letter[0]) {
    } else {
      total++
    }
  }
}) 
console.log(total)