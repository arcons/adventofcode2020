const { group } = require('console');
const fs = require('fs')
 
var contents = fs.readFileSync('./day6/input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
// split by empty newline then by whitespace or newline
const input = contents.split(/\n\s*\n/).map((str) => str.split(/\s+/))
const getSumOfYesIntersect = (input) => {
  let totalYes = 0
  input.forEach(group => {
    let groupSets = []
    let intersection
    group.forEach( (line, index) => 
      {
        groupSets[index] = new Set()
        Array.from(line).forEach(char => {
          groupSets[index].add(char)
      })
      intersection = [...groupSets].reduce((a, b) => new Set([...a].filter(x => b.has(x))));
    })
    totalYes += [...intersection].length
  })
  return totalYes;

}

console.log(getSumOfYesIntersect(input))