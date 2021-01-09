const fs = require('fs')

// var contents = fs.readFileSync('./day24/testinput.txt', 'utf8');
var contents = fs.readFileSync('./day24/input.txt', 'utf8');
// example parse
const input = contents.split(/\n/)
// directions e, se, sw, w, nw, and ne

// create map of the movements
// when storing values in the map subtract opposites then store the final postions
let tileMap = new Map()
let directionSet = new Set(["e", "se", "sw", "w", "nw", "ne"])
const findTilePosition = (directions) => {
  let tilePos = {"e":0, "s":0, "n":0, "w":0}
  console.log(directions)
  while(directions.length !== 0) {
    let nextMove = directions.slice(0,2)
    if(directionSet.has(nextMove) && nextMove.length > 1) {
      tilePos[nextMove[0]]+=1
      tilePos[nextMove[1]]+=1
      // tilePos[nextMove]++
      directions = directions.slice(2)
    } else {
      nextMove = directions.slice(0,1)
      tilePos[nextMove]+=2
      directions = directions.slice(1)
    }
  }
  // e and w are opposites
  if(tilePos['e'] > tilePos['w']) {
    tilePos['e'] = tilePos['e'] - tilePos['w']
    tilePos['w'] = 0
  } else {
    tilePos['w'] = tilePos['w'] - tilePos['e']
    tilePos['e'] = 0
  }
  if(tilePos['n'] > tilePos['s']) {
    tilePos['n'] = tilePos['n'] - tilePos['s']
    tilePos['s'] = 0
  } else {
    tilePos['s'] = tilePos['s'] - tilePos['n']
    tilePos['n'] = 0
  }
  
  return tilePos
}

const flipTiles = (line) => {
  const tile = JSON.stringify(findTilePosition(line))
  // store tile in the 
  if(tileMap.has(tile)) {
    tileMap.set(tile, false)
  } else {
    tileMap.set(tile, true)
  }
}

const findBlackTitles = () => {
  input.forEach(line => {
    flipTiles(line)
  })

  let totalBlack = 0
  tileMap.forEach((black, tile, map) => {
    if(black) totalBlack++
  })
  return totalBlack
}
findTilePosition('nwwswee')
console.log(findBlackTitles())