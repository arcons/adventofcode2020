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
// 
const findNoParenthVal = (stack, lastTotal, lastOp) => {
  let firstVal
  let nextOp
  firstVal = lastTotal
  let secondVal = stack.shift()
  let currentTotal = multOrAdd(lastOp, firstVal, secondVal)
  nextOp = stack.shift()
  // first run
  if(nextOp) {
      return findNoParenthVal(stack, currentTotal, nextOp)
  }
  return currentTotal
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
    let subTotal = findNoParenthVal(subOperation, subOperation.shift(), subOperation.shift())
    line.splice(open, opLength, subTotal)
    parenPair = []
    for(let i=0; i<line.length;i++) {
      if (line[i] === "(") openParenth.push(i);
      if (line[i] === ")") {
        parenPair.push({open: openParenth.pop(), close: i})
      }
    }
  }
  return findNoParenthVal(line, line.shift(), line.shift())
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