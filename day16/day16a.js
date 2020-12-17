const fs = require('fs')
 
var contents = fs.readFileSync('./day16/input.txt', 'utf8');
// example parse
const input = contents.split(/\n\s*\n/).map((str) => str.split(/\n+/))

const parseRuleInput = (rule) => {
  let firstRange = rule[1].split('-').map(val => parseInt(val))
  let secondRange = rule[3].split('-').map(val => parseInt(val))
  return [firstRange, secondRange]
}
const rules = input[0].map(val => val.split(' ')).map(rule => parseRuleInput(rule))
const yourTicket = input[1][1].split(',').map(val=>parseInt(val))
let nearbyTicket = input[2].slice(1).join(',').split(',').map(val => parseInt(val))


const isBetweenRanges = (number) => {
  let valid = false
  valid = rules.some(rule => {
    // console.log(rule[0][0])
    if((rule[0][0] <= number && rule[0][1] >= number) || (rule[1][0] <= number && rule[1][1] >= number)){
      return true
    }
  })
  return valid
}

const findInvalidTickets = () => {
  let invalidNumbers = []
  nearbyTicket.forEach(ticket => {
    if(!isBetweenRanges(ticket)){
      invalidNumbers.push(ticket)
    }
  })
  nearbyTicket.filter(ticket => invalidNumbers.includes(ticket))
  
  return invalidNumbers.reduce((a,b) => a+b)
}

console.log(findInvalidTickets())
