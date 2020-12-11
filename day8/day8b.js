const fs = require('fs')
 
var contents = fs.readFileSync('./day8/input.txt', 'utf8');
let input = contents.split('\n').map((str) => {return {instr : str.split(' '), hasRun : false}})
let accumulator = 0
const acc = (signedNumber) => {
  accumulator+=signedNumber
}

let index = 0
const jmp = (signedNumber) => {
  index += signedNumber-1
}

const nop = (signedNumber) => {

}

let instructionMap = new Map()
instructionMap.set('acc', acc)
instructionMap.set('jmp', jmp)
instructionMap.set('nop', nop)

function findJmpNopPerm() {
  let jmpIndeces = []
  let nopIndeces = []
  input.forEach((element,index) => {
    if(element.instr[0] === 'jmp') jmpIndeces.push(index);
    if(element.instr[0] === 'nop') nopIndeces.push(index);
  });

  permutations = []
  jmpIndeces.forEach(i => {
    nopIndeces.forEach(j => {
      permutations.push({i, j})
    })
  })
  return permutations
}


let swapIndex = 0
var inputClone = JSON.parse(JSON.stringify(input))
let jnPerm = findJmpNopPerm()
const swapAndReset = () => {
  // reset the next list
  index = 0
  accumulator = 0
  inputClone = JSON.parse(JSON.stringify(input))
  let temp = inputClone[jnPerm[swapIndex].j].instr[0]
  inputClone[jnPerm[swapIndex].i].instr[0]=temp
  swapIndex++
  return inputClone
}

const runInfiteLoop = (instructionList) => {
  console.time();
  while(index < instructionList.length) {
    if(index< 0 || instructionList[index].hasRun) {
      instructionList = swapAndReset();
    } else {
      instructionList[index].hasRun = true;
      const signedNumber = Math.sign(instructionList[index].instr[1])*parseInt(instructionList[index].instr[1].slice(1))
      instructionMap.get(instructionList[index].instr[0])(signedNumber)
      index++
      if(index+1 > instructionList.length){
        break
      }
    }
  }
  console.timeEnd();
  return accumulator
}

// deep clone
console.log(runInfiteLoop(inputClone))