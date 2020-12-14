const fs = require('fs')

var contents = fs.readFileSync('./day13/input.txt', 'utf8');
const input = contents.split("\n")
// const input = [17,'x',13,19]

let busIDs = input[1].split(',').map(val => Number.isInteger(parseInt(val)) ? parseInt(val) : val)

// value busID and time after T
let idDepartMap = new Map()
const creatIDDepartMap = () => {
  for(let i = 0; i< busIDs.length; i++) {
    if(busIDs[i] === 'x') {
    } else {
      idDepartMap.set(busIDs[i], i)
    }
  }
}

let currentTimestamp = 100000000000000;
// brute force
const checkIfWorks = () => {
  let isValid = true
  let offset = 0
  for(let i = 0; i< busIDs.length; i++) {
    if(busIDs[i] == 'x') {
      currentTimestamp++
    } else {
      offset = idDepartMap.get(busIDs[i])
      const currentOffset = ((currentTimestamp+offset)%busIDs[i])
      // if the currentOffset from timestamp isn't 0 it's invalid
      // console.log(currentTimestamp, currentOffset, offset, busIDs[i])
        if(currentOffset != offset) {
        isValid = false
        break;
      } else {
        currentTimestamp++
      }
    }
  }
  return isValid
}

const findTimestamp = () => {
  // busIDs = busIDs.filter(x => x != 'x');
  while(!checkIfWorks()) {
    currentTimestamp++;
    // console.log(currentTimestamp)
  }
  return currentTimestamp-busIDs.length
}

const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split('')
const outputAllValues = () => {
  let index=0
  let output =""
  idDepartMap.forEach((value, key, map) => {
    output=output.concat(`${key}${alphabetArray[index]}=(y+${value}), `)
    index++
  })
  console.log(output)
  //not encoding for wolfram alapha correctly
  console.log(encodeURI(`https://www.wolframalpha.com/input/?i=${output}`))
}
creatIDDepartMap()
// plug in to wolfram alpha
// outputAllValues()
console.time()
console.log(findTimestamp())
console.timeEnd()