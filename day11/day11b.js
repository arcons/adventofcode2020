const fs = require('fs')
 
var contents = fs.readFileSync('./day11/input.txt', 'utf8');
let input = contents.split('\n').map(str => str.split(''))
let currentRun// = JSON.parse(JSON.stringify(input))

const empty = 'L'
const occupied = '#'

const setOccupied = (y, x) => {
  // keep track of not occupied seeats
  // if(x == 1 && y == 7) {
  //   console.log("error here")
  // }
  let notOccCount = 0
  let origX = x
  let origY = y

  // top
  if(input[y-1]) {
    // while it's 
    while (input[y-1] && input[y-1][x] != '#') {
      if(input[y-1][x] == 'L') {
        notOccCount++
        //console.log("t")
        break;
      }
      y--
      if(!input[y-1]) {
        notOccCount++
        break;
      }
    }
  } else {
    //console.log("t ")
    notOccCount++
  }
  x = origX
  y = origY
  // top right
  if(input[y-1] && input[y-1][x+1]) {
    // while it's 
    while (input[y-1] && input[y-1][x+1] && input[y-1][x+1] != '#') {
      if(input[y-1][x+1] == 'L') {
        notOccCount++
        //console.log("t r")
        break;
      }
      y--
      x++
      if(!input[y-1] || !input[y-1][x+1]) {
        notOccCount++
        break;
      }
    }
  } else {
    notOccCount++
    //console.log("t r")
  }
  x = origX
  y = origY
  // right
  if(input[y][x+1]) {
    // while it's 
    while (input[y][x+1] && input[y][x+1]  != '#') {
      if(input[y][x+1] == 'L') {
        notOccCount++
        //console.log("r")
        break;
      }
      x++
      if(!input[y][x+1]) {
        notOccCount++
        break;
      }
    }
  } else {
    //console.log("r")
    notOccCount++
  }
  x = origX
  y = origY
  // bottom right
  if(input[y+1] && input[y+1][x+1]) {
    // while it's 
    while (input[y+1] && input[y+1][x+1] && input[y+1][x+1]  != '#') {
      if(input[y+1][x+1] == 'L') {
        notOccCount++
        //console.log("b r")
        break;
      }
      y++
      x++
      if(!input[y+1] || !input[y+1][x+1]) {
        notOccCount++
        break;
      }
    }
  } else {
    notOccCount++
    //console.log("b r")

  }
  x = origX
  y = origY
  // bottom
  if(input[y+1]) {
    // while it's 
    while (input[y+1] && input[y+1][x] != '#') {
      if(input[y+1][x] == 'L') {
        notOccCount++
        //console.log("b ")
        break;
      }
      y++
      if(!input[y+1]) {
        notOccCount++
        break;
      }
    }
  } else {
    //console.log("b ")
    notOccCount++
  }
  x = origX
  y = origY
  // bottom left
  if(input[y+1] && input[y+1][x-1]) {
    // while it's 
    while (input[y+1] && input[y+1][x-1] && input[y+1][x-1]  != '#') {
      if(input[y+1][x-1] == 'L') {
        notOccCount++
        //console.log("b left")
        break;
      }
      y++
      x--
      if(!input[y+1] || !input[y+1][x-1]) {
        notOccCount++
        break;
      }
    }
  } else {
    //console.log(" b left")
    notOccCount++
  }
  x = origX
  y = origY
  // left
  if(input[y][x-1]) {
    // while it's 
    while (input[y][x-1] && input[y][x-1]  != '#') {
      if(input[y][x-1] == 'L') {
        notOccCount++
        //console.log("left")
        break;
      }
      x--
      if(!input[y][x-1]) {
        notOccCount++
        break;
      }
    }
  } else {
    //console.log("left")
    notOccCount++
  }
  x = origX
  y = origY
  // top left
  if(input[y-1] && input[y-1][x-1]) {
    // while it's 
    while (input[y-1] && input[y-1][x-1] && input[y-1][x-1]  != '#') {
      if(input[y-1][x-1] == 'L') {
        //console.log("top left")
        notOccCount++
        break;
      }
      y--
      x--
      if(!input[y-1] || !input[y-1][x-1]) {
        notOccCount++
        break;
      }
    }
  } else {
    //console.log("top left")
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
    while (input[y-1] && input[y-1][x] != 'L') {
      if(input[y-1][x] == '#') {
        occCount++
        //console.log("t")
        break;
      }
      y--
      if(!input[y-1]) {
        break;
      }
    }
  } else {
  }
  x = origX
  y = origY
  // top right
  if(input[y-1] && input[y-1][x+1]) {
    // while it's 
    while (input[y-1] && input[y-1][x+1] && input[y-1][x+1] != 'L') {
      if(input[y-1][x+1] == '#') {
        occCount++
        ////console.log("t r")
        break;
      }
      y--
      x++
      if(!input[y-1] || !input[y-1][x+1]) {
        break;
      }
    }
  } else {
  }
  x = origX
  y = origY
  // right
  if(input[y][x+1]) {
    // while it's 
    while (input[y][x+1] && input[y][x+1]  != 'L') {
      if(input[y][x+1] == '#') {
        occCount++
        //console.log("r")
        break;
      }
      x++
      if(!input[y][x+1]) {
        break;
      }
    }
  } else {
  }
  x = origX
  y = origY
  // bottom right
  if(input[y+1] && input[y+1][x+1]) {
    // while it's 
    while (input[y+1] && input[y+1][x+1] && input[y+1][x+1]  != 'L') {
      if(input[y+1][x+1] == '#') {
        occCount++
        //console.log("b r")
        break;
      }
      y++
      x++
      if(!input[y+1] || !input[y+1][x+1]) {
        break;
      }
    }
  } else {

  }
  x = origX
  y = origY
  // bottom
  if(input[y+1]) {
    // while it's 
    while (input[y+1] && input[y+1][x]  != 'L') {
      if(input[y+1][x] == '#') {
        occCount++
        //console.log("b ")
        break;
      }
      y++
      if(!input[y+1]) {
        break;
      }
    }
  } else {
  }
  x = origX
  y = origY
  // bottom left
  if(input[y+1] && input[y+1][x-1]) {
    // while it's 
    while (input[y+1] && input[y+1][x-1] && input[y+1][x-1]  != 'L') {
      if(input[y+1][x-1] == '#') {
        occCount++
        //console.log("b left")
        break;
      }
      y++
      x--
      if(!input[y+1] || !input[y+1][x-1]) {
        break;
      }
    }
  } else {
  }
  x = origX
  y = origY
  // left
  if(input[y][x-1]) {
    // while it's 
    while (input[y][x-1] && input[y][x-1]  != 'L') {
      if(input[y][x-1] == '#') {
        occCount++
        //console.log("left")
        break;
      }
      x--
      if(!input[y][x-1]) {
        break;
      }
    }
  } else {
  }
  x = origX
  y = origY
  // top left
  if(input[y-1] && input[y-1][x-1]) {
    // while it's 
    while (input[y-1] && input[y-1][x-1] && input[y-1][x-1] != 'L') {
      if(input[y-1][x-1] == '#') {
        occCount++
        //console.log("top left")
        break;
      }
      y--
      x--
      if(!input[y-1] || !input[y-1][x-1]) {
        break;
      }
    }
  } else {
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
  let counter = 0
  while (JSON.stringify(previous) != JSON.stringify(current)) {
    current = input
    previous = runRound()
    // for(let i = 0; i < input.length; i++) {
    //   console.log(input[i].join(''))
    // }
    // console.log(" couunter ", counter++)
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

console.time()
console.log(runUntilNoChange())
console.timeEnd()