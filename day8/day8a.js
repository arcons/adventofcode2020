const fs = require('fs')
 
var contents = fs.readFileSync('./day8/input.txt', 'utf8');
const input = contents.split('\n').map((str) => {return {instr : str.split(' '), hasRun : false}})
var accumulator = 0
const acc = (signedNumber) => {
  accumulator+=signedNumber
}

var index = 0
const jmp = (signedNumber) => {
  index += signedNumber-1
}

const nop = (signedNumber) => {

}

let instructionMap = new Map()
instructionMap.set('acc', acc)
instructionMap.set('jmp', jmp)
instructionMap.set('nop', nop)

const runInfiteLoop = (instructionList) => {
  while(index < instructionList.length) {
    console.log(instructionList[index])
    if(instructionList[index].hasRun) {
      break
    } else {
      instructionList[index].hasRun = true;
      const signedNumber = Math.sign(instructionList[index].instr[1])*parseInt(instructionList[index].instr[1].slice(1))
      instructionMap.get(instructionList[index].instr[0])(signedNumber)
      index++
    }
  }
  return accumulator
}

console.log(runInfiteLoop(input))