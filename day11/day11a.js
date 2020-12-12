const fs = require('fs')
 
var contents = fs.readFileSync('./day11/input.txt', 'utf8');
let input = contents.split('\n').map(str => str.split(''))
let currentRun// = JSON.parse(JSON.stringify(input))

const empty = 'L'
const occupied = '#'

const setOccupied = (y, x) => {
  let noOccCount = 0
  // above
  if(!input[y-1] || input[y-1][x] != '#') {
    noOccCount++
  }
  // top right
  if(!input[y-1] || !input[y-1][x+1] || input[y-1][x+1] != '#') {
    noOccCount++
  }
  // right
  if(!input[y][x+1] || input[y][x+1] != '#') {
    noOccCount++
  }
  // bottom right
  if(!input[y+1] || !input[y+1][x+1] || input[y+1][x+1] != '#') {
    noOccCount++
  }
  // bottom
  if(!input[y+1] || input[y+1][x] != '#') {
    noOccCount++
  }
  // bottom
  if(!input[y+1] || !input[y+1][x-1] || input[y+1][x-1] != '#') {
    noOccCount++
  }
  // left
  if(!input[y][x-1] || input[y][x-1] != '#') {
    noOccCount++
  }
  // top left
  if(!input[y-1] || !input[y-1][x-1] || input[y-1][x-1] != '#') {
    noOccCount++
  }

  if(noOccCount == 8) {
    return true
  }
  return false
}

const setEmpty = (y, x) => {
  let occCount = 0
  // above
  if(input[y-1] && input[y-1][x] == '#') {
    occCount++
  }
  // top right
  if(input[y-1] && input[y-1][x+1] && input[y-1][x+1] == '#') {
    occCount++
  }
  // right
  if(input[y][x+1] && input[y][x+1] == '#') {
    occCount++
  }
  // bottom right
  if(input[y+1] && input[y+1][x+1] && input[y+1][x+1] == '#') {
    occCount++
  }
  // bottom
  if(input[y+1] && input[y+1][x] == '#') {
    occCount++
  }
  // bottom
  if(input[y+1] && input[y+1][x-1] && input[y+1][x-1] == '#') {
    occCount++
  }
  // left
  if(input[y][x-1] && input[y][x-1] == '#') {
    occCount++
  }
  // top left
  if(input[y-1] && input[y-1][x-1] && input[y-1][x-1] == '#') {
    occCount++
  }

  if(occCount >= 4) {
    return true
  }
  return false
}

const runRound = () => {
  currentRun = JSON.parse(JSON.stringify(input))
  for(let i = 0; i < input.length; i++) {
    for(let j = 0; j < input[i].length; j++) {
      let currentSeat = input[i][j]
      if(currentSeat != '.' && currentSeat != 'L' && setEmpty(i,j)) {
        currentRun[i][j] = 'L'
      }
      if(currentSeat != '.' && currentSeat != '#' && setOccupied(i,j)) {
        currentRun[i][j] = '#'
      }
    }
  }
  input = JSON.parse(JSON.stringify(currentRun))
  return JSON.parse(JSON.stringify(currentRun))
}

const runUntilNoChange = () => {
  let previous
  let current = input
  while (JSON.stringify(previous) != JSON.stringify(current)) {
    current = input
    previous = runRound()
  }
  return findOccupiedSeats()
}

const findOccupiedSeats = () => {
  let occupiedSeats = 0
  for(let i = 0; i < input.length; i++) {
    for(let j = 0; j < input[i].length; j++) {
      if(input[i][j] == occupied) {
        occupiedSeats++
      }
    }
  }
  return occupiedSeats
}


console.log(runUntilNoChange())