const fs = require('fs')
 
var contents = fs.readFileSync('./day19/testinput.txt', 'utf8');
// example parse
const input = contents.split(/\n\s*\n/).map((str) => str.split(/\n+/))

let ruleMap = new Map()
const buildRuleMap = () => {
  // all are based at input[0]
  input[0].forEach(rule => {
    rule = rule.split(':')
    let ruleNumber = rule[0]
    let ruleList = rule[1].split('|').map(val => val.trim().split(' '))
    // if the rulelist > 1 then it has multiple rule 
    ruleMap.set(ruleNumber, ruleList)
  })
}
buildRuleMap()

// rule index was not incremented on next evaluation
const getValidSubRule = (nextRule, msg, ruleIndex, isValid) => {
  console.log(`checking valid, ${nextRule} at ${ruleIndex}`)
  if(nextRule[0] == 'a' || nextRule[0] == 'b') {
    if(msg[ruleIndex] != nextRule[0]) {
      isValid = false
      return isValid
    }
    return isValid
  }
  // check if the rule 
  if(!Array.isArray(nextRule)){ //&& !isNaN(parseInt(nextRule))) {
    console.log("Is a or b at index", ruleIndex)
    nextRule = ruleMap.get(nextRule)
    return getValidSubRule(nextRule, msg, ruleIndex, isValid)
  }
  else if(Array.isArray(nextRule[0]) && Array.isArray(nextRule[1])) {
    console.log("Validate or option", nextRule)
    const prevIndex = ruleIndex
    const firstRule = getValidSubRule(nextRule[0], msg, prevIndex, isValid)
    const secondRule = getValidSubRule(nextRule[1], msg, prevIndex, isValid)
    // problem is the indeces are not being bumped
    console.log(`option 1 ${nextRule[0]} is ${firstRule}, option 2 ${nextRule[1]} is ${secondRule}`)
    ruleIndex = prevIndex+1
    return (firstRule || secondRule)
  }
  else {
    if(nextRule[0] == '3' && nextRule[1] == '2') {
      console.log("3 2")
    }
    for(let i = 0; i< nextRule.length; i++) {
      console.log(nextRule)
      let validMessage = getValidSubRule(nextRule[i], msg, ruleIndex, isValid)
      if(!validNumber) {
        break
      }
      isValid = validNumber
      ruleIndex=newIndex
    }
  }
  return isValid
}

const validMessage = (msg) => {
  // determine if multiple check
  const ruleZ = ruleMap.get('0')
  let isValid = true;
  let nextRule
  console.log(ruleZ)
  ruleZ[0].forEach((rule) => {
    nextRule = ruleMap.get(rule)
    console.log("CHECK VALID", rule, ruleIndex)
    isValid = getValidSubRule(nextRule ,msg, ruleIndex, isValid)
    ruleIndex++
    if(!isValid) {
      return;
    }
  })
  if(ruleIndex != msg.length) {
    return false
  }
  ruleIndex = 0
  return isValid
}

const findZeroRuleMatches = () => {
  let validRuleCount = 0
  const receiveMessages = input[1]
  receiveMessages.forEach(message => {
    console.log("check msg ", message)
    validMessage(message) ? validRuleCount++ : null
    console.log("valid count ", validRuleCount)
  })
  return validRuleCount
}

console.log(findZeroRuleMatches())
console.log("done")