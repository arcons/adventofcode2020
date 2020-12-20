const fs = require('fs')
 
var contents = fs.readFileSync('./day16/input.txt', 'utf8');
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

const getDifferenceBetweenColumns = (allRules) => {
  // this isn't going to work due to the fact that there are some with 0, need to figure out how to ignore those
  intersection = [...allRules].reduce((a, b) => {
    // console.log(a, b)
    if(b.size === 0) {
      return a
    }
    return new Set([...a].filter(x => b.has(x)))
  }
  );
  return [...intersection]
}

const numRows = nearbyTicket.length
let realRules = new Array(yourTicket.length)

const findDepartureTickets = () => {
  let ruleSetColumns = new Array(yourTicket.length)
  for(let i = 0; i < ruleSetColumns.length; i++) { 
    ruleSetColumns[i]=[]
  }
  nearbyTicket.forEach((row, rowIndex) => {
    row.forEach((ticket,index) => {
      if(!isBetweenRanges(ticket)){
        row.pop(index)
      }
    })
    row.forEach((ticket, index)=> {
      // all validRules for each ticket
      let validRuleSet = isValidForRules(ticket);
      if(validRuleSet.size === 1) {
        realRules[index]=[...validRuleSet][0]
      }
      ruleSetColumns[index].push(validRuleSet)
    })
  })
  ruleSetColumns.forEach((column,index) => {
      let differences = getDifferenceBetweenColumns(column);
      realRules[index] = differences
  })

  let finalRules = new Array(yourTicket.length)
  for(let i = 0; i < 20; i++ ) {
    finalRules[i]=undefined
  }
  while(finalRules.includes(undefined)) {
    realRules.forEach((rule, index) => {
      rule = rule.filter(item => !finalRules.includes(item))
      if(rule.length = 1) {
        finalRules[index] = rule[0];
      }
    })
  }

  let total = 1
  let totalDeparture = 1
  for(let i = 0; i < 20; i++ ) {
    if(finalRules[i] && finalRules[i].includes('departure')) {
      // totalDeparture++
      // console.log(totalDeparture)
      console.log(yourTicket[i])
      total *= yourTicket[i]
    }
  }
  // 990612944677 too low
  return total
}

// function findYourTicketInvalid() {
//   yourTicket.forEach((ticket,index) => {
//     if(!isBetweenRanges(ticket)){
//       yourTicket.pop(index)
//     }
//   })
//   console.log(yourTicket)
// }
// console.log(findYourTicketInvalid())
console.log(findDepartureTickets())
