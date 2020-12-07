const fs = require('fs')
 
var contents = fs.readFileSync('./day6/input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
// split by empty newline then by whitespace or newline
const input = contents.split(/\n\s*\n/).map((str) => str.split(/\s+/))
const getSumOfQuestions = (input) => {
  let totalYes = 0
  let questionSet = new Set()
  input.forEach(group => {
    group.forEach(line => {Array.from(line).forEach(char => {questionSet.add(char)})})
    totalYes += questionSet.size
    questionSet = new Set()
  })
  return totalYes;

}

console.log(getSumOfQuestions(input))