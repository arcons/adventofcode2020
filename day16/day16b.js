const fs = require('fs')
 
var contents = fs.readFileSync('./day16/testinput2.txt', 'utf8');
// example parse
const input = contents.split(/\n\s*\n/).map((str) => str.split(/\n+/))

let ruleMap = new Map()
const parseRuleInput = (rule) => {
  let firstRange
  let secondRange 
  if(rule[0] !== 'departure' && rule[0] !== 'arrival') {
    firstRange = rule[1].split('-').map(val => parseInt(val))
    secondRange = rule[3].split('-').map(val => parseInt(val))
    ruleMap.set(rule[0], {firstRange, secondRange})
  } else {
    firstRange = rule[2].split('-').map(val => parseInt(val))
    secondRange = rule[4].split('-').map(val => parseInt(val))
    ruleMap.set(rule[0]+rule[1], {firstRange, secondRange})
  }
  return [firstRange, secondRange]
}
const rules = input[0].map(val => val.split(' ')).map(rule => parseRuleInput(rule))
const yourTicket = input[1][1].split(',').map(val=>parseInt(val))
let nearbyTicket = input[2].slice(1).map(val => val.split(',').map(num => parseInt(num)))


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

const isValidForRules = (number) => {
  let validSet = new Set()
  ruleMap.forEach((ranges, rule, rMap) => {
    if((ranges.firstRange[0] <= number && ranges.firstRange[1] >= number) || (ranges.secondRange[0] <= number && ranges.secondRange[1] >= number)){
      validSet.add(rule)
    }
  })
  return validSet;
}

const getDifferenceBetweenColumns = (row, column, ruleSetArray) => {

}

const rowLength = 3
let realRules = new Array(rowLength)
const findInvalidTickets = () => {
  let ruleSetMap = []
  nearbyTicket.forEach((row, rowIndex) => {
    ruleSetMap.push(new Array(rowLength))
    row.forEach((ticket, index)=> {
      // all validRules for each ticket
      let validRuleSet = isValidForRules(ticket);
      if(validRuleSet.size === 1) {
        realRules[index]=[...validRuleSet][0]
      }
      ruleSetMap[rowIndex][index] = validRuleSet
    })
  })
  console.log(realRules)
  // const filteredTicket = nearbyTicket.map(ticketRow => ticketRow.filter(ticket => !invalidNumbers.includes(ticket)))
  console.log(ruleSetMap)
  ruleSetMap.forEach((ruleSet,index) => {
    [...ruleSet].forEach((set, column) => {
      getDifferenceBetweenColumns(index, column, ruleSetMap)
    })
  })

  return 0
}

console.log(findInvalidTickets())
