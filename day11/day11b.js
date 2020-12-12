const fs = require('fs')
 
var contents = fs.readFileSync('./day11/testinput.txt', 'utf8');
let input = contents.split('\n').map(str => str.split(''))
let currentRun// = JSON.parse(JSON.stringify(input))

const empty = 'L'
const occupied = '#'

const setOccupied = (y, x) => {
  // keep track of not occupied seeats
  let notOccCount = 0
  let origX = x
  let origY = y

  // top
  if(input[y-1]) {
    // while it's 
    while (input[y-1] && input[y-1][x] == '.' && input[y-1][x] != '#') {
      if(input[y-1][x] != 'L') {
        notOccCount++
        break;
      }
      y--
    }
  } else {
    notOccCount++
  }
  x = origX
  y = origY
  // top right
  if(input[y-1] && input[y-1][x+1]) {
    // while it's 
    while (input[y-1] && input[y-1][x+1] && input[y-1][x+1] == '.' && input[y-1][x+1] != '#') {
      if(input[y-1][x] != 'L') {
        notOccCount++
        break;
      }
      y--
      x++
    }
  } else {
    notOccCount++
  }
  x = origX
  y = origY
  // right
  if(input[y][x+1]) {
    // while it's 
    while (input[y][x+1] && input[y][x+1] == '.' && input[y][x+1]  != '#') {
      if(input[y][x+1] != 'L') {
        notOccCount++
        break;
      }
      x++
    }
  } else {
    notOccCount++
  }
  x = origX
  y = origY
  // bottom right
  if(input[y+1]) {
    // while it's 
    while (input[y+1] && input[y+1][x+1] && input[y+1][x+1] == '.' && input[y+1][x+1]  != '#') {
      if(input[y+1][x+1] != 'L') {
        notOccCount++
        break;
      }
      y++
      x++
    }
  } else {
    notOccCount++
  }
  x = origX
  y = origY
  // bottom
  if(input[y+1]) {
    // while it's 
    while (input[y+1] && input[y+1][x] == '.' && input[y+1][x+1]  != '#') {
      if(input[y+1][x] != 'L') {
        notOccCount++
        break;
      }
      y++
    }
  } else {
    notOccCount++
  }
  x = origX
  y = origY
  // bottom left
  if(input[y+1]) {
    // while it's 
    while (input[y+1] && input[y+1][x-1] && input[y+1][x-1] == '.' && input[y+1][x+1]  != '#') {
      if(input[y+1][x-1] != 'L') {
        notOccCount++
        break;
      }
      y++
      x--
    }
  } else {
    notOccCount++
  }
x = origX
y = origY
  // left
  if(input[y][x-1]) {
    // while it's 
    while (input[y][x-1] && input[y][x-1] == '.' && input[y][x-1]  != '#') {
      if(input[y][x-1] != 'L') {
        notOccCount++
        break;
      }
      x--
    }
  } else {
    notOccCount++
  }
  x = origX
  y = origY
  // top left
  if(input[y-1]) {
    // while it's 
    while (input[y-1] && input[y-1][x-1] && input[y-1][x-1] == '.' && input[y-1][x-1]  != '#') {
      if(input[y-1][x] != 'L') {
        notOccCount++
        break;
      }
      y--
      x--
    }
  } else {
    notOccCount++
  }

  if(notOccCount == 8) {
    return true
  }
  return false
}

const setEmpty = (y, x) => {
  // keep track of not occupied seeats
  let occCount = 0
  let origX = x
  let origY = y

  // top
  if(input[y-1]) {
    // while it's 
    while (input[y-1] && input[y-1][x] == '.' && input[y-1][x] != 'L') {
      if(input[y-1][x] == '#') {
        occCount++
        break;
      }
      y--
    }
  } else {
    occCount++
  }
  x = origX
  y = origY
  // top right
  if(input[y-1] && input[y-1][x+1]) {
    // while it's 
    while (input[y-1] && input[y-1][x+1] && input[y-1][x+1] == '.' && input[y-1][x+1] != 'L') {
      if(input[y-1][x] == '#') {
        occCount++
        break;
      }
      y--
      x++
    }
  } else {
    occCount++
  }
  x = origX
  y = origY
  // right
  if(input[y][x+1]) {
    // while it's 
    while (input[y][x+1] && input[y][x+1] == '.' && input[y][x+1]  != 'L') {
      if(input[y][x+1] == '#') {
        occCount++
        break;
      }
      x++
    }
  } else {
    occCount++
  }
  x = origX
  y = origY
  // bottom right
  if(input[y+1]) {
    // while it's 
    while (input[y+1] && input[y+1][x+1] && input[y+1][x+1] == '.' && input[y+1][x+1]  != 'L') {
      if(input[y+1][x+1] == '#') {
        occCount++
        break;
      }
      y++
      x++
    }
  } else {
    occCount++
  }
  x = origX
  y = origY
  // bottom
  if(input[y+1]) {
    // while it's 
    while (input[y+1] && input[y+1][x] == '.' && input[y+1][x+1]  != 'L') {
      if(input[y+1][x] == '#') {
        occCount++
        break;
      }
      y++
    }
  } else {
    occCount++
  }
  x = origX
  y = origY
  // bottom left
  if(input[y+1]) {
    // while it's 
    while (input[y+1] && input[y+1][x-1] && input[y+1][x-1] == '.' && input[y+1][x+1]  != 'L') {
      if(input[y+1][x-1] == '#') {
        occCount++
        break;
      }
      y++
      x--
    }
  } else {
    occCount++
  }
x = origX
y = origY
  // left
  if(input[y][x-1]) {
    // while it's 
    while (input[y][x-1] && input[y][x-1] == '.' && input[y][x-1]  != 'L') {
      if(input[y][x-1] == '#') {
        occCount++
        break;
      }
      x--
    }
  } else {
    occCount++
  }
  x = origX
  y = origY
  // top left
  if(input[y-1]) {
    // while it's 
    while (input[y-1] && input[y-1][x-1] && input[y-1][x-1] == '.' && input[y-1][x-1]  != 'L') {
      if(input[y-1][x] == '#') {
        occCount++
        break;
      }
      y--
      x--
    }
  } else {
    occCount++
  }

  if(occCount >= 5) {
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
    for(let i = 0; i < input.length; i++) {
      console.log(input[i].join(''))
    }
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