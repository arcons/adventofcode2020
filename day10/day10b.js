const fs = require('fs')
 
var test1contents = fs.readFileSync('./day10/testinput.txt', 'utf8');
var test2contents = fs.readFileSync('./day10/testinput2.txt', 'utf8');
const input1 = test1contents.split('\n').map(i => parseInt(i))
const input2 = test2contents.split('\n').map(i => parseInt(i))

function rFact(num)
{
    if (num <= 0)
      { return 1; }
    else
      { return num * rFact( num - 1 ); }
}

const findAllCombinations = (input) => {
  input.sort((a, b) => a - b)
  const maxJoltage = input[input.length-1]+3
  input.unshift(0)
  input.push(maxJoltage)
  let combo = 0
  let numCombo = 0
  let totalCombo = 0
  let onemultiplier = 2
  let lastNumber
  for(let i = 0; i<input.length; i++) {
    if(((input[i+1] - input[i]) === 3) && (input[i+1] != maxJoltage)) {
      // if(((input[i] - lastNumber)) === 3) {
      //   console.log("Three threes in a row")
      //   combo+=(rFact(threemultiplier))
      //   threemultiplier++
      // }
      if(combo != 0) {
        numCombo++
      }
      totalCombo += combo * rFact(numCombo - onemultiplier)
      onemultiplier = 2
      combo = 0
    };
    if((input[i+1] - input[i]) === 2) {
      if(combo != 0) {
        numCombo++
      }
      totalCombo += combo
      combo = 1
      onemultiplier = 2
    };
    if(((input[i+1] - input[i]) === 1) && (lastNumber != 0) ) {
      if(((input[i] - lastNumber)) === 1) {
        // console.log("Three ones in a row ", lastNumber, input[i], input[i+1])
        combo = (rFact(onemultiplier) * rFact(numCombo)) 
        // console.log("Current combo", combo)
        onemultiplier++
      } else {
        onemultiplier = 2
      }
    }
    lastNumber = input[i]
  }
  totalCombo += combo

  return totalCombo
}

const isValidJoltage = (removedIndex) => {
    if((input[removedIndex+1] - input[removedIndex]) === 3) {
      return true
    }
    else if((input[removedIndex+1] - input[removedIndex]) === 2) {
      console.log("Two dif")
      return true

    } 
    else if((input[removedIndex+1] - input[removedIndex]) === 1) {
      return true

    } else {
      return false
      
    }
}


console.log(findAllCombinations(input1))
console.log(findAllCombinations(input2))