const fs = require('fs')
 
var contents = fs.readFileSync('./day9/input.txt', 'utf8');
const input = contents.split('\n')//.map((str) => {return {instr : str.split(' '), hasRun : false}})

// const findThis = 127
const findThis = 556543474

let summingSubset = []

const findSubsetSum = (minIndex, maxIndex) => {
  let sumSet = 0
  for(let i = minIndex; i < maxIndex; i++) {
    sumSet+=parseInt(input[i])
  }
  return sumSet
}



for(let index=0; index<input.length; index++){
  for(let jindex=1; jindex<input.length; jindex++){
    let currentSumSet = findSubsetSum(index, jindex)
    if(currentSumSet === findThis) {
      const answerSlice = input.slice(index, jindex).sort()
      const minVal = parseInt(answerSlice[0])
      const maxVal = parseInt(answerSlice[answerSlice.length-1])
      console.log("answer= ", (minVal+maxVal) )
      break
    }
  }
}

