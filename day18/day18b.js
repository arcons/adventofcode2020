const fs = require('fs')

var contents = fs.readFileSync('./day18/input.txt', 'utf8');
const input = contents.split("\n").map(values => {
  return values.split('').filter(char => char !== ' ').map(val => parseInt(val) ? parseInt(val) : val)
})

function multOrAdd(op, firstVal, secondVal) {
  let currentVal
  if(op === '+') {
    currentVal = (secondVal + firstVal)
    }
  else {
    currentVal = (secondVal * firstVal)
  }
  return currentVal
}
// make this recursive
// 1 + 2 * 3 + 4 * 5 + 6
// modify this to do the + operations first
const findNoParenthVal = (stack) => {
  let addition = new Array()
  for(let i=0; i<stack.length;i++) {
    if (stack[i] === "+") addition.push(i);
  }
  while(addition.length !== 0) {
    let addIndex = addition.shift()
    const newSum = stack[addIndex-1] + stack[addIndex+1]
    stack.splice(addIndex-1, 3, newSum)
    addition = []
    for(let i=0; i<stack.length;i++) {
      if (stack[i] === "+") addition.push(i);
    }
  }

  let currentTotal
  while(stack.length !== 1) {
    let firstVal = stack.shift()
    stack.shift()
    let secondVal = stack.shift()
    stack.unshift(firstVal*secondVal)
  }
  return stack[0]
}


const findLineTotal = (line) => {
  let openParenth = new Array()
  let parenPair = new Array()
  // get all parenthesis closing
  for(let i=0; i<line.length;i++) {
    if (line[i] === "(") openParenth.push(i);
    if (line[i] === ")") {
      parenPair.push({open: openParenth.pop(), close: i})
    }
  }
  // we know that the lengths are the same so take the last and first and find the substring
  let lineDiff = 0
  while(parenPair.length != 0) {
    let openClose = parenPair.shift()
    let open = openClose.open
    let close = openClose.close
    let subOperation = line.slice(open+1, close)
    opLength = subOperation.length+2
    let subTotal = findNoParenthVal(subOperation)
    line.splice(open, opLength, subTotal)
    parenPair = []
    for(let i=0; i<line.length;i++) {
      if (line[i] === "(") openParenth.push(i);
      if (line[i] === ")") {
        parenPair.push({open: openParenth.pop(), close: i})
      }
    }
  }
  return findNoParenthVal(line)
}

const findSumOfLines = (allLines) => {
  let sum = 0
  allLines.forEach(line => {
    let val = findLineTotal(line)
    console.log(val)
    sum += val
  })
  return sum
}
// console.log(findNoParenthVal(input[0], input[0].shift(), input[0].shift()))
console.log(findSumOfLines(input))