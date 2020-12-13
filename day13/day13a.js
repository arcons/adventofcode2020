const fs = require('fs')

var contents = fs.readFileSync('./day13/input.txt', 'utf8');
const input = contents.split("\n")

const firstTimestamp = parseInt(input[0])
let busIDs = input[1].split(',').filter(x => x != 'x').map(num => parseInt(num))

console.log(firstTimestamp)
console.log(busIDs)

let idDepartMap = new Map()
const creatIDDepartMap = () => {
  for(let i = 0; i< busIDs.length; i++) {
    const lastLeftAt = firstTimestamp - (firstTimestamp%busIDs[i])
    idDepartMap.set(busIDs[i], lastLeftAt)
  }
}

const findEarliestBus = () => {
  let minTime = idDepartMap.get(busIDs[0]) + busIDs[0]
  let minBusId = 0
  for(let i = 0; i< busIDs.length; i++) {
    let tempTime = idDepartMap.get(busIDs[i]) + busIDs[i]
    if(tempTime < minTime) {
      minTime = tempTime
      minBusId = busIDs[i]
    }
  }
  return (minTime - firstTimestamp) * minBusId
}
creatIDDepartMap()
console.log(findEarliestBus())