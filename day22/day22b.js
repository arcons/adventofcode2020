const fs = require('fs')

// var contents = fs.readFileSync('./day22/infinTest.txt', 'utf8');
// var contents = fs.readFileSync('./day22/testinput.txt', 'utf8');
var contents = fs.readFileSync('./day22/input.txt', 'utf8');
// example parse
const input = contents.split(/\n\s*\n/).map((str) => str.split(/\n+/))

// const recursiveCombat = (p1, p2) => {

// }

const runRound = (p1, p2) => {
  // check for recursive round
  let p1Card = p1[0]
  let p2Card = p2[0]
  p1.shift()
  p2.shift()
  if(p1.length >= p1Card && p2.length >= p2Card) {
    let winner = getWinningPlayer(p1,p2)
    // normal round
    if(winner.oneWin) {
      p1.push(p1Card)
      p1.push(p2Card)
      // console.log("p1 win")
    } else {
      p2.push(p2Card)
      p2.push(p1Card)
      // console.log("p2 win")
    }
  } else {
    // normal round
    if(p1Card > p2Card) {
      p1.push(p1Card)
      p1.push(p2Card)
      // console.log("p1 win")
    } else {
      p2.push(p2Card)
      p2.push(p1Card)
      // console.log("p2 win")
    }
  }
  return {p1, p2}
}

const getWinningPlayer = (p1, p2) => {
  let previousMatchups = new Set()
  let playerOne = p1.concat()
  let playerTwo = p2.concat()
  // let roundCount = 0
  let badLoop = false;
  while(playerOne.length !== 0 && playerTwo.length !== 0) {
    // if(roundCount === 4) {
    //   console.log("bork")
    // }
    // roundCount++
    const currentRound = JSON.stringify({playerOne, playerTwo})
    if(previousMatchups.has(currentRound)) {
      badLoop = true
      console.log("Player one wins on break")
      break;
    } else {
      previousMatchups.add(currentRound)
    }
    roundResults = runRound(playerOne, playerTwo)
    playerOne = roundResults.p1
    playerTwo = roundResults.p2
  }
  let winner = (playerTwo.length === 0 || badLoop) ? {playerOne, oneWin:true} : {playerOne:playerTwo, oneWin:false}
  return winner
}

const findFinal = () => {
  let playerOne = input[0].slice(1).map(val => parseInt(val))
  let playerTwo = input[1].slice(1).map(val => parseInt(val))
  let winner = getWinningPlayer(playerOne, playerTwo).playerOne
  let sum = 0
  for(let i = 0; i < winner.length; i++) {
    sum += (winner.length-i) * (winner[i])
  }
  return sum
}
console.log(findFinal())