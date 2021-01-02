const fs = require('fs')
 
var contents = fs.readFileSync('./day22/input.txt', 'utf8');
// example parse
const input = contents.split(/\n\s*\n/).map((str) => str.split(/\n+/))

const runRound = (p1, p2) => {
  if(p1[0] > p2[0]) {
    p1.push(p1[0])
    p1.push(p2[0])
    p1.shift()
    p2.shift()
  } else {
    p2.push(p2[0])
    p2.push(p1[0])
    p1.shift()
    p2.shift()
  }
  return {p1, p2}
}

const getWinningPlayer = () => {
  let playerOne = input[0].slice(1).map(val => parseInt(val))
  let playerTwo = input[1].slice(1).map(val => parseInt(val))
  let roundCount = 0
  while(playerOne.length !== 0 && playerTwo.length !== 0) {
    if(roundCount === 4) {
      console.log("bork")
    }
    roundCount++
    roundResults = runRound(playerOne, playerTwo)
    playerOne = roundResults.p1
    playerTwo = roundResults.p2
  }
  let winner = playerOne.length === 0 ? playerTwo : playerOne
  let sum = 0
  for(let i = 0; i < winner.length; i++) {
    sum += (winner.length-i) * (winner[i])
  }
  return sum
}
console.log(getWinningPlayer())