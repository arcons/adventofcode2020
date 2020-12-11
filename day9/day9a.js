const fs = require('fs')
 
var contents = fs.readFileSync('./day9/input.txt', 'utf8');
const input = contents.split('\n')

const preamble = 25

const getPreambleSet = (currentIndex) => {
  const sumSet = new Set()
  for(let i = currentIndex-preamble; i < currentIndex; i++) {
    for(let j = currentIndex-preamble+1; j < currentIndex+5; j++) {
      sumSet.add((parseInt(input[i]) + parseInt(input[j])))
    }
  }
  return sumSet
}

const findAnswer = () => {
  let answer
  for(let index=preamble; index<input.length; index++){
    let currentSumSet = new Set()
    currentSumSet = getPreambleSet(index)
    console.log(input[index])
    if(!currentSumSet.has(parseInt(input[index]))) {
      console.log("Answer", input[index])
      answer = input[index]
      break
      }
  }
  return answer
}

console.log(findAnswer())

