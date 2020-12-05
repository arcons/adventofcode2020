const fs = require('fs')
 
var contents = fs.readFileSync('./day5/input.txt', 'utf8');
// example parse
const input = contents.split(/\r?\n/)
const idSet = new Set()
const findYourSeat = (input) => {
  input.forEach(seat => {
    let currentRowMax = 127;
    let currentRowMin = 0;
    for(i = 0; i<7; i++) {
      if(seat[i]=='F') { // lower
          currentRowMax = Math.floor((currentRowMax+currentRowMin)/2)
      } else if(seat[i]=='B') { // upper
          currentRowMin = Math.ceil((currentRowMax+currentRowMin)/2)
      }
    }
    let currentColumnMax = 7
    let currentColumnMin = 0;
    for(i = 6; i<seat.length; i++) {
      if(seat[i]=='L') {
        currentColumnMax = Math.floor((currentColumnMax+currentColumnMin)/2)
      } else if(seat[i]=='R') {
        currentColumnMin = Math.ceil((currentColumnMax+currentColumnMin)/2)
      }
    }
    const seatID = (currentRowMin * 8) + currentColumnMin
    idSet.add(seatID)
  })
  let ourSeat;
  idSet.forEach(seatId => {
    if(!idSet.has(seatId-1) && idSet.has(seatId-2)) {
      ourSeat = seatId-1
    }
  })
  return ourSeat
}

console.log(findYourSeat(input))