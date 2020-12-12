const fs = require('fs')
 
var contents = fs.readFileSync('./day10/input.txt', 'utf8');
const input = contents.split('\n').map(i => parseInt(i))

input.sort((a, b) => a - b)
const maxJoltage = input[input.length-1]+3
input.unshift(0)
input.push(maxJoltage)

const findOneByThreeJoltage = () => {
  let oneJ = 0
  let threeJ = 0
  for(let i = 0; i<input.length; i++) {
    if((input[i+1] - input[i]) === 3) {
      threeJ++
    };
    if((input[i+1] - input[i]) === 2) {
      console.log("Two dif")
    };
    if((input[i+1] - input[i]) === 1) {
      oneJ++
    };
  }
  console.log(oneJ)
  console.log(threeJ)

  return oneJ*threeJ
}

console.log(findOneByThreeJoltage())